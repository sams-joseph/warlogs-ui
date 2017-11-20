import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
import Table from '../../Table';
import DamageDoneChart from '../../Visualizations/DamageDoneChart';
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

function createRowOutput(object, casters, target, id, filter) {
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
        <Link to={`/${filter}-details/${id}?player=${row.caster}`}>{row.caster}</Link>,
        <span>
          {row.totalAmount}
          <LinearProgress
            value={row.totalAmount}
            mode="determinate"
            style={{ height: '6px' }}
            max={max}
          />
        </span>,
        row.perSecondAmount,
      ]);
    });
  }

  return rows;
}

const DamageDone = ({ log, success, player }) => (
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
          <DamageDoneChart
            damage={log.damage}
            player={getPlayerName(log.name)}
          />
        </div>
        <Row>
          <h5>Damage Done</h5>
          <Table
            data={createRowOutput(log.damage, log.damageCasters, false, log._id, 'damage')}
            cells={3}
            cellWidth={[2, 8, 2]}
            maxHeight="inherit"
            headers={['Name', 'Amount', 'DPS']}
          />
        </Row>
      </Grid>
    )}
  </div>
);


export default DamageDone;
