import React, { Component } from "react"
import {
  Button,
  Header,
  Segment,
  Table,
  Icon,
  Modal,
  Input
} from "semantic-ui-react"

export default class Income extends Component {
  state = {
    date: "",
    name: "",
    amount: "",
    frequency: "",
    income_id: "",
    modalOpen: false,
    editOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({
    modalOpen: false,
    date: "",
    name: "",
    amount: "",
    income_id: "",
    frequency: ""
  })
  handleEditOpen = () => this.setState({ editOpen: true })
  handleEditClose = () => this.setState({
    editOpen: false,
    date: "",
    name: "",
    amount: "",
    income_id: "",
    frequency: ""
  })

  //Save current value when changed
  handleKeyPress = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  //Factory function
  makeObj = () => {
    return {
      date: this.state.date,
      name: this.state.name,
      amount: this.state.amount,
      frequency: +this.state.frequency,
      user_id: +sessionStorage.getItem("activeUser")
    }
  }

  setIncome = id => {
    let upObj = this.props.income.find(inc => inc.id === id)
    upObj.income_id = id
    this.setState(upObj)
  }

  add = resource => {
    if (this.state.name === "") {
      return window.alert("please enter a name")
    } else if (this.state.amount === "") {
      return window.alert("please enter an amount")
    } else if (this.state.date === "") {
      return window.alert("please enter an amount")
    } else if (this.state.frequency === "") {
      return window.alert("please enter a frequency")
    } else {
      this.props
        .addItem(resource, this.makeObj())
        .then(() => this.props.updateChart())
    }
  }

  update = (resource, id) => {
    this.props
      .updateItem(resource, id, {
        date: this.state.date,
        name: this.state.name,
        amount: this.state.amount,
        frequency: +this.state.frequency,
        user_id: +sessionStorage.getItem("activeUser")
      })
      .then(() => this.props.updateChart())
  }

  render() {
    return (
      <Segment>
        <Header size="huge" inverted>
          <Modal
            size="mini"
            trigger={
              <Button onClick={this.handleOpen} fluid>
                Add Income
              </Button>
            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <Modal.Header>Add Income</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Input
                  autoFocus
                  fluid
                  id="name"
                  icon="file outline"
                  placeholder="Name"
                  onChange={this.handleKeyPress}
                  />
                <Input
                  fluid
                  id="amount"
                  type="number"
                  icon="usd"
                  placeholder="Amount"
                  onChange={this.handleKeyPress}
                  />
                <Input
                  fluid
                  id="date"
                  type="date"
                  icon="calendar alternate outline"
                  onChange={this.handleKeyPress}
                  />
                <Input
                  fluid
                  id="frequency"
                  type="number"
                  placeholder="Frequency (in weeks)"
                  onChange={this.handleKeyPress}
                />
                <Button
                  fluid
                  onClick={() => {
                    this.add("income")
                    this.handleClose()
                  }}
                >
                  Create
                </Button>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Header>
        {this.props.income.map(inco => (
          <Table inverted key={inco.id}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">
                  <Header size="large" inverted id={`name-${inco.id}`}>
                    {inco.name}
                  </Header>
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <Header size="large" inverted id={`amount-${inco.id}`}>
                    ${inco.amount}
                  </Header>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Modal
                    trigger={
                      <Button
                        size="small"
                        id={`edit-${inco.id}`}
                        onClick={() => {
                          this.handleEditOpen()
                          this.setIncome(inco.id)
                        }}
                      >
                        Edit
                      </Button>
                    }
                    size="mini"
                    open={this.state.editOpen}
                    onClose={this.handleEditClose}
                  >
                    <Header
                      icon="edit"
                      content={`Edit ${this.state.name}...`}
                    />
                    <Modal.Content>
                      <Input
                        fluid
                        id="name"
                        icon="file outline"
                        value={this.state.name}
                        onChange={this.handleKeyPress}
                      />
                      <Input
                        fluid
                        id="amount"
                        type="number"
                        icon="usd"
                        value={this.state.amount}
                        onChange={this.handleKeyPress}
                      />
                      <Input
                        fluid
                        id="date"
                        type="date"
                        icon="calendar alternate outline"
                        value={this.state.date}
                        onChange={this.handleKeyPress}
                      />
                      <Input
                        fluid
                        id="frequency"
                        type="number"
                        value={this.state.frequency}
                        onChange={this.handleKeyPress}
                      />
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        basic
                        color="green"
                        onClick={() => {
                          this.handleEditClose()
                          this.update("income", this.state.income_id)
                        }}
                      >
                        Change
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  <Icon
                    as={Button}
                    negative
                    size="small"
                    content="Delete"
                    onClick={() =>
                      this.props
                        .deleteItem("income", inco.id)
                        .then(() => this.props.updateChart())
                    }
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        ))}
      </Segment>
    )
  }
}
