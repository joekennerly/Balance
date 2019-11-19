import React, { Component } from "react"
import { Segment, Header, Table } from "semantic-ui-react"
let moment = require("moment")

export default class Outlook extends Component {
  state = {
    now: moment(),
    start: moment()
      .startOf("week")
      .format("M/D")
  }

  weekGrid = {
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    w6: 0,
    w7: 0,
    w8: 0,
    w9: 0
  }

  // Displays the first day of the week
  getWeekStart = weekNum =>
    moment()
      .startOf("week")
      .add(weekNum, "weeks")

  getWeekNum = startDate => moment(startDate).week()

  isThisDue = (start, current, frequency, amount, weekNumber) => {
    const startWeek = this.getWeekNum(start)
    const currentWeek = this.getWeekNum(current)
    const diff = currentWeek - startWeek
    const isDue = diff % frequency === 0 ? true : false
    console.log(+this.weekGrid[weekNumber] + +amount)
    if (isDue === true) {
      this.weekGrid[weekNumber] = +this.weekGrid[weekNumber] + +amount
      return amount
    }
    else return ""
  }

  addWeek = (start, weeksToAdd) => moment(start).add(weeksToAdd, "weeks")

  render() {

    return (
      <Segment textAlign="center" inverted>
        <Header size="huge">Outlook</Header>
        <Table inverted celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Week 1 - {this.state.start}</Table.HeaderCell>
              <Table.HeaderCell>
                Week 2 - {this.getWeekStart(1).format("M/D")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                Week 3 - {this.getWeekStart(2).format("M/D")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                Week 4 - {this.getWeekStart(3).format("M/D")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                Week 5 - {this.getWeekStart(4).format("M/D")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                Week 6 - {this.getWeekStart(5).format("M/D")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                Week 7 - {this.getWeekStart(6).format("M/D")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                Week 8 - {this.getWeekStart(7).format("M/D")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                Week 9 - {this.getWeekStart(8).format("M/D")}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/* <Table.Row>
              <Table.Cell>Balance Total</Table.Cell>
              <Table.Cell>
                {this.props.diff(
                  this.props.sum(this.props.income),
                  this.props.sum(this.props.categories)
                )}
              </Table.Cell>
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
            </Table.Row> */}



            <Table.Row>
              <Table.Cell>Week's Budget</Table.Cell>
              <Table.Cell>{this.weekGrid.w1}</Table.Cell>
              <Table.Cell>{this.weekGrid.w1}</Table.Cell>
              <Table.Cell>{this.weekGrid.w1}</Table.Cell>
              <Table.Cell>{this.weekGrid.w1}</Table.Cell>
              <Table.Cell>{this.weekGrid.w1}</Table.Cell>
              <Table.Cell>{this.weekGrid.w1}</Table.Cell>
              <Table.Cell>{this.weekGrid.w1}</Table.Cell>
              <Table.Cell>{this.weekGrid.w1}</Table.Cell>
              <Table.Cell>{this.weekGrid.w1}</Table.Cell>
            </Table.Row>



            {this.props.categories.map(category => (
              <Table.Row key={category.id}>
                <Table.Cell>{category.name}</Table.Cell>
                <Table.Cell>
                  {this.isThisDue(
                    category.date,
                    this.addWeek(this.state.now, 0),
                    category.frequency,
                    category.amount,
                    "w1"
                  )}
                </Table.Cell>
                <Table.Cell>
                {this.isThisDue(
                    category.date,
                    this.addWeek(this.state.now, 1),
                    category.frequency,
                    category.amount,
                    "w2"
                  )}
                </Table.Cell>
                <Table.Cell>
                {this.isThisDue(
                    category.date,
                    this.addWeek(this.state.now, 2),
                    category.frequency,
                    category.amount,
                    "w3"
                  )}
                </Table.Cell>
                <Table.Cell>
                {this.isThisDue(
                    category.date,
                    this.addWeek(this.state.now, 3),
                    category.frequency,
                    category.amount,
                    "w4"
                  )}
                </Table.Cell>
                <Table.Cell>
                {this.isThisDue(
                    category.date,
                    this.addWeek(this.state.now, 4),
                    category.frequency,
                    category.amount,
                    "w5"
                  )}
                </Table.Cell>
                <Table.Cell>
                {this.isThisDue(
                    category.date,
                    this.addWeek(this.state.now, 5),
                    category.frequency,
                    category.amount,
                    "w6"
                  )}
                </Table.Cell>
                <Table.Cell>
                {this.isThisDue(
                    category.date,
                    this.addWeek(this.state.now, 6),
                    category.frequency,
                    category.amount,
                    "w7"
                  )}
                </Table.Cell>
                <Table.Cell>
                {this.isThisDue(
                    category.date,
                    this.addWeek(this.state.now, 7),
                    category.frequency,
                    category.amount,
                    "w8"
                  )}
                </Table.Cell>
                <Table.Cell>
                {this.isThisDue(
                    category.date,
                    this.addWeek(this.state.now, 8),
                    category.frequency,
                    category.amount,
                    "w9"
                  )}
                </Table.Cell>


              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}
