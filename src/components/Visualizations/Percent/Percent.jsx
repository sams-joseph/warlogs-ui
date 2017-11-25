import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gradient } from 'abcolor';
import constants from '../../constants';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 40px;
  justify-content: center;
  width: 100%;
`;

const PercentContainer = styled.div`
  background: ${constants.darkBackground};
  width: 100%;
  height: 6px;
`;

const Percent = ({ percent, color, totalAmount }) => (
  <StyledContainer>
    <span>{totalAmount}</span>
    <PercentContainer>
      <div
        style={{
          width: `${percent}%`,
          height: '6px',
          background: gradient(percent, {
            css: true,
            from: color[0],
            to: color[1],
          }),
        }}
      />
    </PercentContainer>
  </StyledContainer>
);

const { number, string, arrayOf } = PropTypes;
Percent.propTypes = {
  percent: number,
  totalAmount: number,
  color: arrayOf(string),
};

export default Percent;
