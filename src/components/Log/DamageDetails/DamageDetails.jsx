import React, { Component } from 'react'
import queryString from 'query-string';

class DamageDetails extends Component {
  render() {
    const query = queryString.parse(this.props.location.search);

    return (
      <div>
        Damage done details for player {query.player}
      </div>
    )
  }
}

export default DamageDetails;