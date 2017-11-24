import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Chip from 'material-ui/Chip';

class ChipBar extends Component {
  handleTouchTap = () => {
    const { id, type } = this.props;
    this.props.history.push(`/log-overview/${id}/?type=${type}`);
  }

  render() {
    const { player } = this.props;
    return (
      <div>
        <Chip
          onRequestDelete={this.handleTouchTap}
        >
          {player}
        </Chip>
      </div>
    );
  }
}

const { string, shape } = PropTypes;
ChipBar.propTypes = {
  player: string,
  type: string,
  id: string,
  history: shape({}),
};

export default withRouter(ChipBar);
