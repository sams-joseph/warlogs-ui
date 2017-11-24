import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Table from '../../Table';
import HealingDoneChart from '../../Visualizations/HealingDoneChart';
import Percent from '../../Visualizations/Percent';
import constants from '../../constants';
import {
  calculateTotalAmount,
  calculatePerSecond,
  getPlayerName,
} from '../../../utils/data';

const Grid = styled.div`
  display: block;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const HealingDone = ({ log, success, player }) => (
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
        <div style={{ marginBottom: '10px' }}>
          <HealingDoneChart
            healing={log.healing}
            player={getPlayerName(log.name)}
          />
        </div>
        <Row>
          <h5>Healing Done</h5>
          <Table
            data={createRowOutput(log.healing, log.healingCasters, false, log._id, 'healing', [constants.compliment2Color, constants.complimentColor])}
            cells={3}
            cellWidth={['100px', '40%', '30px']}
            maxHeight="inherit"
            headers={['Name', 'Amount', 'HPS']}
          />
        </Row>
      </Grid>
    )}
  </div>
);


export default HealingDone;
