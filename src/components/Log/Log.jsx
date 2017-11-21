import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import queryString from 'query-string';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';
import PlayerHeader from '../PlayerHeader';
import SubNavbar from '../SubNavbar';
import Overview from './Overview';
import DamageDone from './DamageDone';
import HealingDone from './HealingDone';

import { getPlayerName } from '../../utils/data';

import { getLogByID } from '../../actions/logs';

const Container = styled.div`
  position: relative;
  max-width: 1240px;
  padding: 30px 20px 70px 20px;
  margin: 0 auto;
  min-height: calc(100vh - 255px);
`;

class Log extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
    };
  }

  componentDidMount() {
    this.props.getLogByID(this.props.match.params.id).then(() => {
      this.setState({
        success: true,
      });
    });
  }

  getPlayerClass = (object, player) => {
    let career = 'Unknown Career';
    object.forEach((obj) => {
      if (obj.caster.name === player && obj.spell.meta) {
        career = obj.spell.meta.career;
      }
    });

    return career;
  }

  render() {
    const { log } = this.props;
    const { success } = this.state;
    const query = queryString.parse(this.props.location.search);
    const links = [
      {
        key: 'overview', route: `/log-overview/${log._id}?type=overview`, name: 'Overview', disabled: false,
      },
      {
        key: 'damage-done', route: `/log-overview/${log._id}?type=damage-done`, name: 'Damage Done', disabled: false,
      },
      {
        key: 'healing-done', route: `/log-overview/${log._id}?type=healing-done`, name: 'Healing Done', disabled: false,
      },
      {
        key: 'damage-taken', route: `/log-overview/${log._id}?type=overview`, name: 'Damage Taken', disabled: true,
      },
      {
        key: 'deaths', route: `/log-overview/${log._id}?type=overview`, name: 'Deaths', disabled: true,
      },
    ];

    return (
      <Container>
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
          <div>
            <PlayerHeader
              player={getPlayerName(log.name)}
              image={this.getPlayerClass(log.raw, getPlayerName(log.name))}
              career={this.getPlayerClass(log.raw, getPlayerName(log.name)).split('-').join(' ')}
              date={moment(log.date).format('MMMM DD, YYYY h:mm A')}
            />
            <SubNavbar links={links} current={query.type} />
            {
              query.type === 'overview' && (
                <Overview
                  id={this.props.match.params.id}
                  log={log}
                  success={success}
                  player={getPlayerName(log.name)}
                />
              )
            }
            {
              query.type === 'damage-done' && (
                <DamageDone
                  id={this.props.match.params.id}
                  log={log}
                  success={success}
                  player={getPlayerName(log.name)}
                />
              )
            }
            {
              query.type === 'healing-done' && (
                <HealingDone
                  id={this.props.match.params.id}
                  log={log}
                  success={success}
                  player={getPlayerName(log.name)}
                />
              )
            }
          </div>
        )}
      </Container>
    );
  }
}

const { func } = PropTypes;
Log.propTypes = {
  getLogByID: func,
};

function mapStateToProps(state) {
  return {
    success: state.logs.success,
    log: state.logs.log,
  };
}

export default connect(mapStateToProps, { getLogByID })(Log);