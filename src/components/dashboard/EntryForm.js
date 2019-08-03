import React, { Component } from "react"
import Categories from "../form/Categories";
// import APIManager from "../../modules/APIManager"

export default class EntryForm extends Component {
  state = {
    date: "",
    category: "",
    name: "",
    amount: ""
  }

  //Load current date and current category
  componentDidMount() {
    const stateToChange = {}
    stateToChange.date = this.props.date
    stateToChange.category = document.querySelector("#category").value
    this.setState(stateToChange)
  }

  //Save current value when changed
  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  //Handle Submit
  handleClick = () => {
    // Post to db

    let obj = {}
    obj.amount = this.state.amount.toFixed(2)
    this.setState(obj)
    console.log(this.state)
  }

  render() {
    return (
      <React.Fragment>
        <div className="column ui input">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={this.props.date}
            onChange={this.handleFieldChange}
          />
        </div>
        <div className="column ui input">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            type="text"
            placeholder="category"
            value={this.props.category}
            onChange={this.handleFieldChange}
            className="ui dropdown"
          >
            <Categories categories={this.props.categories}/>
          </select>
        </div>
        <div className="column ui input">
        <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="name"
            value={this.props.name}
          />
        </div>
        <div className="column ui input">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="amount"
            value={this.props.amount}
          />
        </div>
        <button
          className="ui button primary"
          onClick={() =>
            this.props.addItem("expenses", this.state, "/expenses")
          }
        >
          +
        </button>
      </React.Fragment>
    )
  }
}
