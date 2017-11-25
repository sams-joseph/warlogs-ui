import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';
import Table from '../../Table';
import OverviewChart from '../../Visualizations/OverviewChart';
import Percent from '../../Visualizations/Percent';
import {
  calculateTotalAmount,
  calculatePerSecond,
  getSpellsCast,
  calculateDamageTotalForAbility,
  calculateTakenPerSecond,
  getPlayerName,
  filterByCaster,
} from '../../../utils/data';
import constants from '../../constants';

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
    background: #000;
  }
`;

const SpellName = styled.span`
  display: block;
  margin: 0 10px;
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

function getSpellIcon(object, spell) {
  const attackIcon = '23418';
  let spellIcon = '23419';
  if (object && spell) {
    object.forEach((obj) => {
      if (spell === 'attack') spellIcon = attackIcon;
      else if (obj.spell.spellName === spell && obj.spell.meta) {
        spellIcon = obj.spell.meta.imageID;
      }
    });
  }

  return spellIcon;
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

function getPlayerClass(object, player) {
  let career = 'npc';
  object.forEach((obj) => {
    if (obj.caster.name === player && obj.spell.meta) {
      career = obj.spell.meta.career;
    }
  });

  return career;
}

function createRowOutput(object, casters, target, id, filter, color) {
  const max = calculateHighestAmount(object, casters, target);
  let rowData = [];
  const rows = [];

  if (object && casters) {
    casters.forEach((caster) => {
      const career = getPlayerClass(object, caster);
      const totalAmount = calculateTotalAmount(object, caster, target);
      let perSecondAmount = calculatePerSecond(object, caster, target);
      if (perSecondAmount === Infinity || Number.isNaN(perSecondAmount)) {
        perSecondAmount = 1;
      }
      if (totalAmount > 0) {
        rowData.push({
          caster,
          career,
          totalAmount,
          perSecondAmount,
        });

        rowData = rowData.sort(Comparator);
      }
    });

    rowData.forEach((row) => {
      rows.push([
        <SpellContainer><img src={`/images/icons/${row.career}.png`} alt="spell name" /><SpellName><Link to={`/${filter}-details/${id}?player=${row.caster}&type=${filter}-done`}>{row.caster}</Link></SpellName></SpellContainer>,
        <span>
          {row.totalAmount}
          <Percent percent={(row.totalAmount / max) * 100} color={color} />
        </span>,
        row.perSecondAmount,
      ]);
    });
  }

  return rows;
}

function createRowInput(object, color) {
  if (!object) return;
  const allSpells = getSpellsCast(object);
  const max = calculateHighestAmountBySpell(object, allSpells);
  let rowData = [];
  const rows = [];

  allSpells.forEach((spell) => {
    const totalAmount = calculateDamageTotalForAbility(object, spell);
    const icon = getSpellIcon(object, spell);
    let perSecondAmount = calculateTakenPerSecond(object, spell);
    if (perSecondAmount === Infinity || Number.isNaN(perSecondAmount)) {
      perSecondAmount = 1;
    }
    if (totalAmount > 0) {
      rowData.push({
        spell,
        icon,
        totalAmount,
        perSecondAmount,
      });

      rowData = rowData.sort(Comparator);
    }
  });

  rowData.forEach((row) => {
    rows.push([
      <SpellContainer><img src={`/images/abilities/${row.icon}.png`} alt="spell name" /><SpellName><Link to="/">{row.spell}</Link></SpellName></SpellContainer>,
      <span>
        {row.totalAmount}
        <Percent percent={(row.totalAmount / max) * 100} color={color} />
      </span>,
      row.perSecondAmount,
    ]);
  });

  return rows;
}

function createRowDeaths(deaths, damageTaken, damage) {
  if (!deaths) return;
  const startTime = Date.parse(damageTaken[0].timestamp.dateTime);
  const rows = [];
  deaths.forEach((object, index) => {
    const career = getPlayerClass(damage, object.player);
    const milliseconds = Date.parse(object.timestamp.dateTime) - startTime;
    const duration = moment.duration(milliseconds);
    const eventTime = moment.utc(duration.asMilliseconds()).format('mm:ss');
    if (index === 0) {
      rows.push([
        <SpellContainer><img src={`/images/icons/${career}.png`} alt="spell name" /><SpellName>{object.player}</SpellName></SpellContainer>,
        eventTime,
      ]);
    } else if (Date.parse(object.timestamp.dateTime) !== Date.parse(deaths[index - 1].timestamp.dateTime) && index !== 0) {
      rows.push([
        <SpellContainer><img src={`/images/icons/${career}.png`} alt="spell name" /><SpellName>{object.player}</SpellName></SpellContainer>,
        eventTime,
      ]);
    }
  });

  return rows;
}

const Overview = ({ log, success, player }) => (
  <div>
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
        <div>
          <OverviewChart
            damage={filterByCaster(log.damage, player)}
            healing={log.healing}
            player={getPlayerName(log.name)}
          />
        </div>
        <Row>
          <Column>
            <h5>Damage Done</h5>
            <Table
              data={createRowOutput(log.damage, log.damageCasters, false, log._id, 'damage', [constants.complimentColor, constants.compliment2Color])}
              cells={3}
              cellWidth={['140px', '30%', '30px']}
              maxHeight="240px"
              headers={['Name', 'Amount', 'DPS']}
            />
          </Column>
          <Column>
            <h5>Healing Done</h5>
            <Table
              data={createRowOutput(log.healing, log.healingCasters, false, log._id, 'healing', [constants.compliment2Color, constants.complimentColor])}
              cells={3}
              cellWidth={['100px', '30%', '30px']}
              maxHeight="240px"
              headers={['Name', 'Amount', 'HPS']}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <h5>Damage Taken By Source</h5>
            <Table
              data={createRowInput(log.damageTaken, [constants.complimentColor, constants.compliment2Color])}
              cells={3}
              cellWidth={['120px', '30%', '30px']}
              headers={['Name', 'Amount', 'DTPS']}
              maxHeight="240px"
            />
          </Column>
          <Column>
            <h5>Deaths</h5>
            <Table
              data={createRowDeaths(log.deaths, log.damageTaken, log.damage)}
              cells={2}
              cellWidth={['40%', '40px']}
              headers={['Name', 'Time']}
              maxHeight="240px"
            />
          </Column>
        </Row>
      </Grid>
    )}
  </div>
);


export default Overview;
