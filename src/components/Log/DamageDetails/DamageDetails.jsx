import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import moment from 'moment';
import PlayerHeader from '../../PlayerHeader';
import SubNavbar from '../../SubNavbar';
import Percent from '../../Visualizations/Percent';
import DamageDoneChart from '../../Visualizations/DamageDoneChart';
import Table from '../../Table';
import ChipBar from '../../ChipBar';

import constants from '../../constants';
import { getLogFilteredByUnit } from '../../../actions/logs';
import {
  filterByCaster,
  getPlayerName,
  calculateDamageTotalForAbility,
  getSpellsCast,
  calculateSpellCrit,
} from '../../../utils/data';


const Container = styled.div`
  position: relative;
  max-width: 1240px;
  padding: 30px 20px 70px 20px;
  margin: 0 auto;
  min-height: calc(100vh - 255px);
`;

const Grid = styled.div`
  display: block;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SpellContainer = styled.div`
  display: flex;
  align-items: center;

  & img {
    height: 25px;
    width: 25px;
  }
`;

const SpellName = styled.span`
  display: block;
  margin: 0 10px;
`;

function Comparator(a, b) {
  if (a.totalAmount > b.totalAmount) return -1;
  if (a.totalAmount < b.totalAmount) return 1;
  return 0;
}

function getSpellIcon(object, spell) {
  let spellIcon = '02400';
  if (object && spell) {
    object.forEach((obj) => {
      if (obj.spell.spellName === spell && obj.spell.meta) {
        spellIcon = obj.spell.meta.imageID;
      }
    });
  }

  return spellIcon;
}

function getNumSpellCasts(object, spell) {
  let casts = 0;
  object.forEach((obj) => {
    if (obj.spell.spellName === spell) casts++;
  });

  return casts;
}

function calculateHighestAmount(object, spells) {
  let highestAmount = 0;
  if (object && spells) {
    spells.forEach((spell) => {
      const totalAmount = calculateDamageTotalForAbility(object, spell);
      if (totalAmount > highestAmount) highestAmount = totalAmount;
    });
  }

  return highestAmount;
}

function createRowOutput(object, color) {
  const spells = getSpellsCast(object);
  const max = calculateHighestAmount(object, spells);
  let rowData = [];
  const rows = [];

  if (object) {
    spells.forEach((spell) => {
      const totalAmount = calculateDamageTotalForAbility(object, spell);
      const spellCrit = calculateSpellCrit(object, spell);
      const icon = getSpellIcon(object, spell);
      const casts = getNumSpellCasts(object, spell);
      const avgHit = Math.round(totalAmount / casts);

      if (totalAmount > 0) {
        rowData.push({
          icon,
          spell,
          totalAmount,
          casts,
          avgHit,
          spellCrit,
        });

        rowData = rowData.sort(Comparator);
      }
    });

    rowData.forEach((row) => {
      rows.push([
        <SpellContainer><img src={`/images/abilities/${row.icon}.png`} alt="spell name" /><SpellName>{row.spell}</SpellName></SpellContainer>,
        <span>
          {row.totalAmount}
          <Percent percent={(row.totalAmount / max) * 100} color={color} />
        </span>,
        row.casts,
        row.avgHit,
        `${row.spellCrit}%`,
      ]);
    });
  }

  return rows;
}

class DamageDetails extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    this.props.getLogFilteredByUnit(this.props.match.params.id, query.player).then(() => {
      this.setState({
        success: true,
      });
    });
  }

  getPlayerClass = (object, player) => {
    let career = 'Unknown Career';
    object.forEach((obj) => {
      if (obj.caster.name === player && obj.spell.meta) {
        career = obj.spell.meta.career;
      }
    });

    return career;
  }

  render() {
    const { success } = this.state;
    const { log } = this.props;
    const query = queryString.parse(this.props.location.search);
    const links = [
      {
        key: 'overview', route: `/log-overview/${log._id}?type=overview`, name: 'Overview', disabled: false,
      },
      {
        key: 'damage-done', route: `/damage-details/${log._id}?player=${query.player}&type=damage-done`, name: 'Damage Done', disabled: false,
      },
      {
        key: 'healing-done', route: `/healing-details/${log._id}?player=${query.player}&type=healing-done`, name: 'Healing Done', disabled: false,
      },
      {
        key: 'damage-taken', route: `/damage-taken-details/${log._id}?player=${query.player}&type=overview`, name: 'Damage Taken', disabled: true,
      },
      {
        key: 'deaths', route: `/deaths-details/${log._id}?player=${query.player}&type=overview`, name: 'Deaths', disabled: true,
      },
    ];

    return (
      <Container>
        {!success ? (
          <CircularProgress
            style={{
              top: '50%',
              left: '50%',
              position: 'absolute',
              transform: 'translateX(-50%) translateY(-50%)',
            }}
          />
        ) : (
          <Grid>
            <PlayerHeader
              player={getPlayerName(log.name)}
              image={this.getPlayerClass(log.raw, getPlayerName(log.name))}
              career={this.getPlayerClass(log.raw, getPlayerName(log.name)).split('-').join(' ')}
              date={moment(log.date).format('MMMM DD, YYYY h:mm A')}
            />
            <SubNavbar links={links} current={query.type} />
            <ChipBar player={query.player} id={log._id} type={query.type} />
            <div style={{ marginBottom: '10px' }}>
              <DamageDoneChart
                damage={filterByCaster(log.damage, query.player)}
                player={getPlayerName(log.name)}
              />
            </div>
            <Row>
              <h5>Damage Done</h5>
              <Table
                data={createRowOutput(log.damage, [constants.complimentColor, constants.compliment2Color])}
                cells={5}
                cellWidth={['100px', '30%', '30px', '30px', '30px']}
                maxHeight="inherit"
                headers={['Name', 'Amount', 'Casts', 'Avg Hit', 'Crit %']}
              />
            </Row>
          </Grid>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.logs.success,
    log: state.logs.log,
  };
}

export default connect(mapStateToProps, { getLogFilteredByUnit })(DamageDetails);
