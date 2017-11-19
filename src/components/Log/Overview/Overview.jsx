import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
import Table from '../../Table';
import AreaChart from '../../AreaChart';
import PlayerHeader from '../../PlayerHeader';
import SubNavbar from '../../SubNavbar';
import {
  calculateTotalAmount,
  calculatePerSecond,
  getSpellsCast,
  calculateDamageTotalForAbility,
  calculateTakenPerSecond,
  getPlayerName,
  filterByCaster,
} from '../../../utils/data';
import { getLogByID } from '../../../actions/logs';

const Grid = styled.div`
  display: block;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Column = styled.div`
  width: 50%;
  padding: 10px;
  
  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  @media(max-width: 700px) {
    width: 100%;
    padding: 0;
  }
`;

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
    };
  }

  componentDidMount() {
    this.props.getLogByID(this.props.match.params.id).then(() => {
      this.setState({
        success: true,
      });
    });
  }

  render() {
    const { log } = this.props;
    const { success } = this.state;

    const links = [
      {
        key: 'overview', route: `/log-overview/${log._id}`, name: 'Overview', disabled: false,
      },
      {
        key: 'damage-done', route: `/log-overview/${log._id}`, name: 'Damage Done', disabled: true,
      },
      {
        key: 'healing-done', route: `/log-overview/${log._id}`, name: 'Healing Done', disabled: true,
      },
      {
        key: 'damage-taken', route: `/log-overview/${log._id}`, name: 'Damage Taken', disabled: true,
      },
      {
        key: 'deaths', route: `/log-overview/${log._id}`, name: 'Deaths', disabled: true,
      },
    ];

    return (
      <div className="container">
        {!success ? (
          <CircularProgress
            style={{
              top: "50%",
              left: "50%",
              position: "absolute",
              transform: "translateX(-50%) translateY(-50%)"
            }}
          />
        ) : (
          <div>
            <PlayerHeader player={getPlayerName(log.name)} image={getPlayerClass(log.raw, getPlayerName(log.name))} career={getPlayerClass(log.raw, getPlayerName(log.name)).split('-').join(' ')} date={moment(log.date).format("MMMM DD, YYYY h:mm A")}/>
            <SubNavbar links={links} current="overview"/>
            <AreaChart
              damage={filterByCaster(log.damage, "Gorshield")}
              healing={log.healing}
              player={getPlayerName(log.name)}
            />
            <Grid>
              <Row>
                <Column>
                  <h5>Damage Done</h5>
                  <Table
                    data={createRowOutput(log.damage, log.damageCasters, false)}
                    cells={3}
                    cellWidth={[2, 8, 2]}
                    maxHeight="240px"
                    headers={["Name", "Amount", "DPS"]}
                  />
                </Column>
                <Column>
                  <h5>Healing Done</h5>
                  <Table
                    data={createRowOutput(log.healing, log.healingCasters, false)}
                    cells={3}
                    cellWidth={[2, 8, 2]}
                    maxHeight="240px"
                    headers={["Name", "Amount", "HPS"]}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <h5>Damage Taken By Source</h5>
                  <Table
                    data={createRowInput(log.damageTaken)}
                    cells={3}
                    cellWidth={[2, 8, 2]}
                    headers={["Name", "Amount", "DTPS"]}
                    maxHeight="240px"
                  />
                </Column>
                <Column>
                  <h5>Deaths</h5>
                  <Table
                    data={createRowDeaths(log.deaths)}
                    cells={2}
                    cellWidth={[3, 8]}
                    headers={["Name", "Time"]}
                    maxHeight="240px"
                  />
                </Column>
              </Row>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.logs.success,
    log: state.logs.log
  };
}

function calculateHighestAmount(object, casters, target) {
  let highestAmount = 0;
  if (object && casters) {
    casters.forEach((caster) => {
      const totalAmount = calculateTotalAmount(object, caster, target);
      if (totalAmount > highestAmount) highestAmount = totalAmount;
    });
  }

  return highestAmount;
}

function calculateHighestAmountBySpell(object, spells) {
  let highestAmount = 0;
  spells.forEach((spell) => {
    const totalAmount = calculateDamageTotalForAbility(object, spell);
    if (totalAmount > highestAmount) highestAmount = totalAmount;
  });

  return highestAmount;
}

function Comparator(a, b) {
  if (a.totalAmount > b.totalAmount) return -1;
  if (a.totalAmount < b.totalAmount) return 1;
  return 0;
}

function createRowOutput(object, casters, target) {
  const max = calculateHighestAmount(object, casters, target);
  let rowData = [];
  const rows = [];

  if (object && casters) {
    casters.forEach((caster) => {
      const totalAmount = calculateTotalAmount(object, caster, target);
      let perSecondAmount = calculatePerSecond(object, caster, target);
      if (perSecondAmount === Infinity || isNaN(perSecondAmount))
        perSecondAmount = 1;

      if (totalAmount > 0) {
        rowData.push({
          caster,
          totalAmount,
          perSecondAmount,
        });

        rowData = rowData.sort(Comparator);
      }
    });

    rowData.forEach((row) => {
      rows.push([
        <Link to="/">{row.caster}</Link>,
        <span>
          {row.totalAmount}
          <LinearProgress
            value={row.totalAmount}
            mode="determinate"
            style={{ height: "6px" }}
            max={max}
          />
        </span>,
        row.perSecondAmount,
      ]);
    });
  }

  return rows;
}

function createRowInput(object) {
  if (!object) return;
  const allSpells = getSpellsCast(object);
  const max = calculateHighestAmountBySpell(object, allSpells);
  let rowData = [];
  const rows = [];

  allSpells.forEach((spell) => {
    const totalAmount = calculateDamageTotalForAbility(object, spell);
    let perSecondAmount = calculateTakenPerSecond(object, spell);
    if (perSecondAmount === Infinity || isNaN(perSecondAmount)) {
      perSecondAmount = 1;
    }
    if (totalAmount > 0) {
      rowData.push({
        spell,
        totalAmount,
        perSecondAmount,
      });

      rowData = rowData.sort(Comparator);
    }
  });

  rowData.forEach((row) => {
    rows.push([
      <Link to="/">{row.spell}</Link>,
      <span>
        {row.totalAmount}
        <LinearProgress
          value={row.totalAmount}
          mode="determinate"
          style={{ height: "6px" }}
          max={max}
        />
      </span>,
      row.perSecondAmount,
    ]);
  });

  return rows;
}

function createRowDeaths(objects) {
  if (!objects) return;
  const rows = [];
  objects.forEach(object => {
    rows.push([
      object.player,
      moment(object.timestamp.dateTime).format("MMMM DD, YYYY h:mm A")
    ]);
  });

  return rows;
}

function getPlayerClass(object, player) {
  let career = 'Unknown Career';
  object.forEach(obj => {
    if (obj.caster.name === player && obj.spell.meta) {
      career =  obj.spell.meta.career;
    }
  });

  return career;
}

export default connect(mapStateToProps, { getLogByID })(Overview);
