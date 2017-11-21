import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import constants from '../../constants';

const PercentContainer = styled.div`
  background: ${constants.darkBackground};
  width: 100%;
  height: 6px;
`;

const Percent = ({ percent, color }) => (
  <PercentContainer>
    <div
      style={{
        width: `${percent}%`,
        height: '6px',
        background: `linear-gradient(to right, ${color[0]}, ${color[1]})`,
      }}
    />
  </PercentContainer>
);

const { string, arrayOf } = PropTypes;
Percent.propTypes = {
  percent: string,
  color: arrayOf,
};

export default Percent;
