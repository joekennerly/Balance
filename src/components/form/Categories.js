import React, { Component } from "react"
import { Button, Grid, Modal, Input } from "semantic-ui-react"

export default class Categories extends Component {
  state = {
    name: "",
    amount: "",
    modalOpen: false
  }
  toggleClick = event => {
    // if not an INPUT...
    if (event.target.tagName !== "INPUT") {
      //only previously toggled forms will have a "show/toggle" class
      let toggledForm = document.querySelector(".show")
      let toggledText = document.querySelector(".toggled")
      //if there is an element with "show/toggled" class...
      if (toggledForm) {
        // toggle it back
        toggledForm.classList.toggle("hide")
        toggledText.classList.toggle("hide")
        // and remove temporary class
        toggledForm.classList.remove("show")
        toggledText.classList.remove("toggled")
      }

      //selectable elements will include "-"
      if (event.target.id.includes("-")) {
        //grab the num from a two element array
        let id = +event.target.id.split("-")[1]
        //hide text; add "toggled" class
        event.target.classList.toggle("hide")
        // add temporary class
        event.target.classList.add("toggled")
        //when TEXT is clicked
        let editable = document.querySelector(`#edit-${event.target.id}`)
        editable.classList.toggle("hide")
        //show edit form
        editable.classList.add("show")
        //find the object with matching id from this.props
        let upObj = this.props.categories.find(category => category.id === id)
        //update state with current values
        this.setState(upObj)
      }
    }
  }
  enterKey = event => {
    if (event.key === "Enter") {
      let hiddenId = event.target.id.split("-")
      let hiddenText = document.querySelector(`#${hiddenId[1]}-${hiddenId[2]}`)
      hiddenText.classList.toggle("hide")
      hiddenText.classList.remove("toggled")
      event.target.classList.toggle("hide")
      event.target.classList.remove("show")
      let eventId = +event.target.id.split("-")[2]
      return this.props.updateItem("categories", eventId, this.makeObj())
    }
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
  handleEdit = event => {
    const stateToChange = {}
    stateToChange[event.target.id.split("-")[1]] = event.target.value
    this.setState(stateToChange)
  }
  //Factory function
  makeObj = () => {
    return {
      name: this.state.name,
      amount: this.state.amount,
      user_id: +sessionStorage.getItem("activeUser")
    }
  }
  // ADD / Delete
  addAndClose = () => {
    this.props.addItem("categories", this.makeObj())
    this.handleClose()
  }
  del = e => this.props.deleteItem("categories", e.target.id.split("-")[1])

  render() {
    return (
      <React.Fragment>
        <Grid columns={3} onClick={this.toggleClick}>
          <Grid.Row>
            <Modal
              trigger={
                <Button onClick={this.handleOpen}>+ Add category</Button>
              }
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
          </Grid.Row>
          {this.props.categories.map(category => (
            <Grid.Row key={category.id}>
              <Grid.Column textAlign="center">
                <div id={`name-${category.id}`}>{category.name}</div>
                <input
                  id={`edit-name-${category.id}`}
                  type="text"
                  value={this.state.name}
                  className="hide"
                  onChange={this.handleEdit}
                  onKeyPress={this.enterKey}
                />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <div id={`amount-${category.id}`}>${category.amount}</div>
                <input
                  id={`edit-amount-${category.id}`}
                  type="text"
                  value={this.state.amount}
                  className="hide"
                  onChange={this.handleEdit}
                  onKeyPress={this.enterKey}
                />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Button id={`category-${category.id}`} onClick={this.del}>
                  x
                </Button>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      </React.Fragment>
    )
  }
}
