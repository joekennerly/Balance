import React, { Component } from "react"
import { Button, Modal, Input } from "semantic-ui-react"

export default class Categories extends Component {
  state = {
    name: "",
    amount: "",
    modalOpen: false
  }
  // Functions to open and close the "add category" modal
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  //Save current value when changed
  handleKeyPress = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }
  makeObj = () => {
    return {
      name: this.state.name,
      amount: this.state.amount,
      user_id: +sessionStorage.getItem("activeUser")
    }
  }
  addAndClose = () => {
    console.log(this.makeObj())
    this.props.addItem("categories", this.makeObj())
    this.handleClose()
  }

  del = e => this.props.deleteItem("categories", e.target.id.split("-")[1])

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={<Button onClick={this.handleOpen}>+ Add category</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <Modal.Header>Enter a new category</Modal.Header>
          <Modal.Content>
            <Input
              autoFocus
              id="name"
              placeholder="name"
              onChange={this.handleKeyPress}
            />
            <Input
              id="amount"
              placeholder="amount"
              onChange={this.handleKeyPress}
            />
            <Button onClick={this.addAndClose}>+ Add Category</Button>
          </Modal.Content>
        </Modal>
        {this.props.categories.map(category => (
          <div key={category.id} value={category.name}>
            {category.name}: ${category.amount}
            <Button id={`category-${category.id}`} onClick={this.del}>
              x
            </Button>
          </div>
        ))}
      </React.Fragment>
    )
  }
}
