import React, { Component } from "react"
import { Button, Modal, Input } from "semantic-ui-react"

export default class Categories extends Component {
  state = {
    name: "",
    amount: "",
    user_id: ""
  }

  componentWillMount = () =>
    this.setState({
      user_id: +sessionStorage.getItem("activeUser")
    })
  //Save current value when changed
  handleKeyPress = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }
  add = () => this.props.addItem("categories", this.state)

  del = e => this.props.deleteItem("categories", e.target.id.split("-")[1])

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <Modal
          trigger={<Button>Add category</Button>}
          // header="Reminder!"
          // content="Call Benjamin regarding the reports."
          actions={[{ key: "done", content: "Done", positive: true }]}
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
            <Button onClick={this.add}>+ Add Category</Button>
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
