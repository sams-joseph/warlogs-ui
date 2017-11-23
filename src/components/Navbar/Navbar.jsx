import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import constants from '../constants';

const Header = styled.header`
  background: ${constants.almostBlack};
  display: flex;
  height: 55px;
  padding: 0 20px;
  position: relative;
  top: 0;

  & ul {
    margin: 0 30px;
    padding: 0;
    height: 55px;
    list-style-type: none;

    & li > a {
      line-height: 55px;
      transition: color 0.125s;
      font-size: 14px;

      &:hover {
        text-decoration: none;
      }
    }
  }

  & img {
    height: 35px;
    width: 35px;
    margin: 10px 0;
  }
`;

const SiteName = styled.span`
  display: block;
  line-height: 55px;
  color: white;
  margin-left: 10px;
`;

const Navbar = () => (
  <Header>
    <img src="/images/warlogs-logo-white.svg" alt="Warhammerlogs" />
    <SiteName>Warhammer Logs</SiteName>
    <ul>
      <li>
        <Link to="/">
          Recent Logs
        </Link>
      </li>
    </ul>
  </Header>
);

export default Navbar;
