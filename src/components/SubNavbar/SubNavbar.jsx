import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import constants from '../constants';

const StyledMain = styled.main`
  border-bottom: 1px solid ${constants.highlightColor};
  margin: 40px 0;
  height: 40px;
  width: 100%;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & a {
    border-bottom: 2px solid transparent;
    color: white;
    flex-grow: 1;
    font-size: 13px;
    font-weight: 100;
    line-height: 38px;
    max-width: 150px;
    text-align: center;
    transition: color 0.125s;

    &:hover {
      color: ${constants.hoverColor};
    }

    &[disabled] {
      pointer-events: none;
      color: ${constants.disabledColor};
    }
  }

  & .active {
    border-bottom: 2px solid ${constants.complimentColor};
  }
`;


const SubNavbar = ({ links, current }) => (
  <StyledMain>
    <StyledSection>
      {links.map(link => (
        <Link
          key={`${link.name}_${link.route}_${link.key}`}
          className={link.key === current ? 'active' : ''}
          to={link.route}
          disabled={link.disabled}
        >
          {link.name}
        </Link>
      ))}
    </StyledSection>
  </StyledMain>
);

const { string, shape, arrayOf } = PropTypes;
SubNavbar.propTypes = {
  links: arrayOf(shape({})),
  current: string,
};

export default SubNavbar;
