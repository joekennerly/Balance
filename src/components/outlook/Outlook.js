import React, { Component } from "react"
import { Segment, Header, Table } from "semantic-ui-react"
let moment = require("moment")

export default class Outlook extends Component {
  state={
    now: moment(),
    today: moment().format("M/D"),
    start: moment().startOf("week").format("M/D")
  }
  getWeekStart = (weekNum) => {
    return moment().startOf("week").add(weekNum, "weeks").format("M/D")
  }
  render() {
    return (
      <Segment textAlign="center" inverted>
        <Header size="huge">Outlook</Header>
        <Table inverted celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Week 1 - {this.state.start}</Table.HeaderCell>
              <Table.HeaderCell>Week 2 - {this.getWeekStart(1)}</Table.HeaderCell>
              <Table.HeaderCell>Week 3 - {this.getWeekStart(2)}</Table.HeaderCell>
              <Table.HeaderCell>Week 4 - {this.getWeekStart(3)}</Table.HeaderCell>
              <Table.HeaderCell>Week 5 - {this.getWeekStart(4)}</Table.HeaderCell>
              <Table.HeaderCell>Week 6 - {this.getWeekStart(5)}</Table.HeaderCell>
              <Table.HeaderCell>Week 7 - {this.getWeekStart(6)}</Table.HeaderCell>
              <Table.HeaderCell>Week 8 - {this.getWeekStart(7)}</Table.HeaderCell>
              <Table.HeaderCell>Week 9 - {this.getWeekStart(8)}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Balance Total</Table.Cell>
              <Table.Cell>{this.props.diff(this.props.sum(this.props.income),this.props.sum(this.props.categories))}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>Income Total</Table.Cell>
              <Table.Cell>{this.props.sum(this.props.income)}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>Budget Total</Table.Cell>
              <Table.Cell>{this.props.sum(this.props.categories)}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            {
              this.props.categories.map(category => (
                <Table.Row key={category.id}>
                  <Table.Cell>{category.name}</Table.Cell>
                  <Table.Cell>{category.amount}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}