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

function createRowOutput(object, casters, target, id, filter, color) {
  const max = calculateHighestAmount(object, casters, target);
  let rowData = [];
  const rows = [];

  if (object && casters) {
    casters.forEach((caster) => {
      const totalAmount = calculateTotalAmount(object, caster, target);
      let perSecondAmount = calculatePerSecond(object, caster, target);
      if (perSecondAmount === Infinity || Number.isNaN(perSecondAmount))
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
        <Link to={`/${filter}-details/${id}?player=${row.caster}`}>{row.caster}</Link>,
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
    let perSecondAmount = calculateTakenPerSecond(object, spell);
    if (perSecondAmount === Infinity || Number.isNaN(perSecondAmount)) {
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
        <Percent percent={(row.totalAmount / max) * 100} color={color} />
      </span>,
      row.perSecondAmount,
    ]);
  });

  return rows;
}

function createRowDeaths(objects) {
  if (!objects) return;
  const rows = [];
  objects.forEach((object) => {
    rows.push([
      object.player,
      moment(object.timestamp.dateTime).format('MMMM DD, YYYY h:mm A'),
    ]);
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
              cellWidth={[2, 8, 2]}
              maxHeight="240px"
              headers={['Name', 'Amount', 'DPS']}
            />
          </Column>
          <Column>
            <h5>Healing Done</h5>
            <Table
              data={createRowOutput(log.healing, log.healingCasters, false, log._id, 'healing', [constants.compliment2Color, constants.complimentColor])}
              cells={3}
              cellWidth={[2, 8, 2]}
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
              cellWidth={[2, 8, 2]}
              headers={['Name', 'Amount', 'DTPS']}
              maxHeight="240px"
            />
          </Column>
          <Column>
            <h5>Deaths</h5>
            <Table
              data={createRowDeaths(log.deaths)}
              cells={2}
              cellWidth={[3, 8]}
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
