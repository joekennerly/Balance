import React, { Component } from "react"
import { Button, Header, Segment, Table, Input, Modal } from "semantic-ui-react"

export default class Categories extends Component {
  state = {
    name: "",
    amount: "",
    date: "",
    category_id: "",
    editOpen: false,
    catOpen: false
  }

  //Handle Modal
  openCat = () => this.setState({ catOpen: true })
  closeCat = () => this.setState({
    catOpen: false,
    name: "",
    amount: "",
    date: "",
    category_id: ""
  })
  openEdit = () => this.setState({ editOpen: true })
  closeEdit = () => this.setState({
    editOpen: false,
    name: "",
    amount: "",
    date: "",
    category_id: ""
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
      name: this.state.name,
      amount: this.state.amount,
      date: this.state.date,
      category_id: this.state.category_id,
      user_id: +sessionStorage.getItem("activeUser")
    }
  }

  setCategory = categoryId => {
    let upObj = this.props.categories.find(cat => cat.id === categoryId)
    upObj.category_id = categoryId
    this.setState(upObj)
  }

  add = resource => {
    if (this.state.name === "") {
      return window.alert("please enter a name")
    } else if (this.state.amount === "") {
      return window.alert("please enter an amount")
    } else if (this.state.date === "") {
      return window.alert("please enter an date")
    } else {
      this.props
        .addItem(resource, this.makeObj())
        .then(() => this.props.updateChart())
    }
  }

  del = (resource, id) => {
    this.props.deleteItem(resource, id).then(() => this.props.updateChart())
  }

  update = (resource, id) => {
    this.props
      .updateItem(resource, id, {
        date: this.state.date,
        name: this.state.name,
        amount: this.state.amount,
        user_id: +sessionStorage.getItem("activeUser")
      })
      .then(() => this.props.updateChart())
  }

  render() {
    return (
      <Segment>
        <Header size="huge" inverted>
          <Modal
            trigger={
              <Button onClick={this.openCat} fluid>
                Add Budget
              </Button>
            }
            size="mini"
            open={this.state.catOpen}
            onClose={this.closeCat}
          >
            <Modal.Header>Add Budget</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Input
                  autoFocus
                  fluid
                  id="name"
                  icon="file outline"
                  onChange={this.handleKeyPress}
                />
                <Input
                  fluid
                  id="amount"
                  type="number"
                  icon="usd"
                  onChange={this.handleKeyPress}
                />
                <Input
                  fluid
                  id="date"
                  type="date"
                  icon="calendar alternate outline"
                  onChange={this.handleKeyPress}
                />
                <Button
                  fluid
                  onClick={() => {
                    this.add("categories")
                    this.closeCat()
                  }}
                >
                  Create
                </Button>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Header>
        {this.props.categories.map(category => (
          <Table inverted key={category.id}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Header size="large" inverted id={`name-${category.id}`}>
                    {category.name}
                  </Header>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Header size="large" inverted id={`amount-${category.id}`}>
                    ${category.amount}
                  </Header>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Modal
                    trigger={
                      <Button
                        id={`edit-${category.id}`}
                        size="small"
                        onClick={() => {
                          this.openEdit()
                          this.setCategory(category.id)
                        }}
                      >
                        Edit
                      </Button>
                    }
                    size="mini"
                    open={this.state.editOpen}
                    onClose={this.closeEdit}
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
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        basic
                        color="green"
                        onClick={() => {
                          this.update("categories", category.id)
                          this.closeEdit()
                        }}
                      >
                        Change
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  <Button
                    negative
                    size="small"
                    id={`delete-${category.id}`}
                    onClick={() => {
                      this.del("categories", category.id)
                    }}
                  >
                    Delete
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        ))}
      </Segment>
    )
  }
}
