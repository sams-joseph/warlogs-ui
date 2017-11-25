import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Table from '../../Table';
import DamageDoneChart from '../../Visualizations/DamageDoneChart';
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

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function getPlayerClass(object, player) {
  let career = 'npc';
  object.forEach((obj) => {
    if (obj.caster.name === player && obj.spell.meta) {
      career = obj.spell.meta.career;
    }
  });

  return career;
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

function Comparator(a, b) {
  if (a.totalAmount > b.totalAmount) return -1;
  if (a.totalAmount < b.totalAmount) return 1;
  return 0;
}

function createRowOutput(object, casters, target, id, filter, color) {
  const max = calculateHighestAmount(object, casters, target);
  let rowData = [];
  const columns = [[], [], []];

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
      columns[0].push([
        <SpellContainer>
          <img src={`/images/icons/${row.career}.png`} alt="spell name" />
          <SpellName>
            <Link to={`/${filter}-details/${id}?player=${row.caster}&type=${filter}-done`}>
              {row.caster}
            </Link>
          </SpellName>
        </SpellContainer>,
      ]);
      columns[1].push([
        <Percent percent={(row.totalAmount / max) * 100} color={color} totalAmount={row.totalAmount} />,
      ]);
      columns[2].push([
        row.perSecondAmount,
      ]);
    });
  }
  return columns;
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
            colSizes={[1, 2, 1]}
            data={createRowOutput(log.damage, log.damageCasters, false, log._id, 'damage', [constants.complimentColor, constants.compliment2Color])}
            maxHeight="inherit"
            autoHeight
            headers={['Name', 'Amount', 'DPS']}
          />
        </Row>
      </Grid>
    )}
  </div>
);


export default DamageDone;
