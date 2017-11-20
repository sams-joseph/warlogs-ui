import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';

const StyledDiv = styled.div`
  padding: 20px;
  width: 100%;
`;

const AlertContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  width: 100%;
  background: #344c68;
  border: 1px solid #4699F8;

  & h4 {
    margin: 0 0 5px 0;
    padding: 0;
    color: white;
    font-weight: normal;
  }

  & ul {
    margin: 0;
    padding: 0 15px;
    list-style-type: square;
    color: white;

    & li {
      font-size: 12px;
      font-weight: 100;
    }
  }
`;

class Alert extends Component {
  constructor() {
    super();

    this.state = {
      title: String,
      body: String,
    };
  }

  componentDidMount() {
    axios.get('https://api.github.com/search/issues?q=repo:sams-joseph/warlogs-ui+type:pr+label:release&order=desc&page=1&per_page=1')
      .then((data) => {
        this.setState({ title: data.data.items[0].title, body: data.data.items[0].body });
      });
  }

  onClick = () => {
    if (localStorage) {
      localStorage.setItem('dismiss', 1234);
    }
    this.setState({ dismissed: true });
  };

  render() {
    const updateBody = this.state.body.toString().split('-');
    const update = updateBody.splice(1, updateBody.length);

    if (!localStorage.getItem('dismiss') && !this.state.dismissed && Number(localStorage.getItem('dismiss')) < 1235) {
      return (
        <StyledDiv>
          <AlertContainer>
            <div>
              <h4>{this.state.title}</h4>
              <ul>
                {
                  update.map(listItem => <li>{listItem}</li>)
                }
              </ul>
            </div>
            <div>
              <RaisedButton label="dismiss" primary onClick={this.onClick} buttonStyle={{ borderRadius: '2px' }} />
            </div>
          </AlertContainer>
        </StyledDiv>
      );
    }

    return null;
  }
}

const { shape } = PropTypes;
Alert.propTypes = {
  info: shape({}),
};

export default Alert;
