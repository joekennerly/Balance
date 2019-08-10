import React, { Component } from "react"
import Chart from "../chart/Chart"
import { Button, Grid, Modal, Input } from "semantic-ui-react"


export default class Dashboard extends Component {
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
      .then(()=>this.props.updateChart())
      .then(()=>this.handleClose())
    }
  render() {

    return (
      <React.Fragment>
        <Chart chartData={this.props.chartData} />
        <Modal
              trigger={
                <Button onClick={this.handleOpen}>+ Add Monthly Budget</Button>
              }
              open={this.state.modalOpen}
              onClose={this.handleClose}
            >
              <Modal.Header>Enter a new Budget</Modal.Header>
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
                <Button onClick={this.addAndClose}>+ Add Budget</Button>
              </Modal.Content>
            </Modal>
      </React.Fragment>
    )
  }
}
