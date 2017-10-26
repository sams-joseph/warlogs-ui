import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Header, Image } from "semantic-ui-react";
import { parseLogs } from "../actions/logs";
import api from "../api";

class ParsePage extends Component {
  constructor() {
    super();
    this.state = { damage: [], healing: [] };
  }
  componentDidMount() {
    this.props.parseLogs(this.props.fileName).then(() => {
      this.setState({ damage: this.props.damage, healing: this.props.healing });
    });
  }

  render() {
    const { damage, healing } = this.state;

    const damagelist = damage.map(obj => {
      return (
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              {obj.spell.meta && (
                <Image
                  src={`images/icons/${obj.spell.meta.career}.png`}
                  shape="rounded"
                  size="mini"
                />
              )}
              <Header.Content>
                {obj.caster.name}
                {obj.spell.meta && (
                  <Header.Subheader>
                    {obj.spell.meta.career.split("-").join(" ")}
                  </Header.Subheader>
                )}
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Header as="h4" image>
              <Image
                src={`images/abilities/${obj.spell.meta
                  ? `${obj.spell.meta.imageID}.png`
                  : "08050.png"}`}
                shape="rounded"
                size="mini"
              />
              <Header.Content>{obj.spell.spellName}</Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            {obj.spell.amount} {obj.spell.critical ? "Critical Hit" : ""}
          </Table.Cell>
          {obj.spell.extra && (
            <Table.Cell>
              {obj.spell.extra.amount} {obj.spell.extra.label}
            </Table.Cell>
          )}
        </Table.Row>
      );
    });
    return (
      <div>
        <h1>Parse Page</h1>
        {this.props.fileName}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Ability</Table.HeaderCell>
              <Table.HeaderCell>Damage</Table.HeaderCell>
              <Table.HeaderCell>Mitigated</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{damagelist}</Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="5" />
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fileName: state.logs.fileName,
    damage: state.logs.data.damage,
    healing: state.logs.data.healing
  };
}

export default connect(mapStateToProps, { parseLogs })(ParsePage);
