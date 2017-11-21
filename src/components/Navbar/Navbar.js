import React from "react";
import { Link } from "react-router-dom";
import constants from '../constants';

function Navbar() {
  return (
    <header
      style={{
        background: constants.almostBlack,
        height: "55px",
        position: "relative",
        top: "0"
      }}
    >
      <ul style={{ margin: "0", height: "55px", listStyleType: "none" }}>
        <li>
          <Link style={{ lineHeight: "55px", color: "white" }} to="/">
            Logs
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
