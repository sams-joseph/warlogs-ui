import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {
  AreaChart as AreaChartRecharts,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from 'recharts';
import constants from '../../constants';

const TooltipContent = ({ payload }) => {
  const data = payload && payload[0] && payload[0].payload;

  return (
    <div
      style={{
        background: '#202529',
        padding: '10px',
        color: '#F3F5F8',
      }}
    >
      <p style={{ color: '#42f4d4', margin: '10px 0' }}>
        HPS: <span style={{ color: '#F3F5F8' }}>{data && data.rHealing}</span>
      </p>
    </div>
  );
};

class HealingDoneChart extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  render() {
    const { healing } = this.props;
    const chartData = [];
    const tooltipData = [];
    const healingData = createPerSecondChartData(healing);

    for (let i = 0; i < healingData.length; i++) {
      chartData.push({
        rHealing: healingData[i],
        time: i,
      });

      tooltipData.push({
        time: healing[i].timestamp.time,
        rDamage: healingData[i],
      });
    }

    return (
      <Paper
        style={{
          marginTop: '30px',
          border: `1px solid ${constants.highlightColor}`,
        }}
        zDepth={0}
      >
        <ResponsiveContainer width="100%" height={250}>
          <AreaChartRecharts
            data={chartData}
            margin={{
              top: 30,
              right: 50,
              left: -10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="time" stroke={constants.disabledColor} />
            <YAxis stroke={constants.disabledColor} />
            <CartesianGrid stroke={constants.highlightColor} strokeWidth={1} opacity={0.5} />
            <Tooltip content={<TooltipContent />} />
            <Area
              type="monotone"
              dataKey="rHealing"
              stroke="#1bec83"
              fillOpacity={0.2}
              fill="#1bec83"
            />
          </AreaChartRecharts>
        </ResponsiveContainer>
      </Paper>
    );
  }
}

function createPerSecondChartData(object) {
  const chartData = [];

  for (let x = 0; x < object.length; x++) {
    if (object[x].spell.amount > 0) {
      let total = 0;
      let perSecond = 0;
      for (let i = 0; i < x; i++) {
        total += object[i].spell.amount;
        const combatDuration =
          Date.parse(object[i].timestamp.dateTime) -
          Date.parse(object[0].timestamp.dateTime);

        perSecond = total / (combatDuration / 1000);
        if (perSecond === Infinity) perSecond = 0;
      }

      chartData.push(Math.round(perSecond));
    }
  }

  return chartData;
}


export default HealingDoneChart;
