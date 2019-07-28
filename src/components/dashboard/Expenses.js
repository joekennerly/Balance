import React, { Component } from "react"

export default class Expenses extends Component {
  render() {
    return (
      <div className="ui five column grid">
        <div className="row">
          <div className="column">Date:</div>
          <div className="column">Category:</div>
          <div className="column">Name:</div>
          <div className="column">Amount:</div>
        </div>
        <div className="row">
          <div className="column">2019-07-22</div>
          <div className="column">Food</div>
          <div className="column">Taco</div>
          <div className="column">$5.00</div>
          <button className="ui button">edit</button>
          <button className="ui button">delete</button>
        </div>
        <div className="row">
          <div className="column">2019-07-22</div>
          <div className="column">Food</div>
          <div className="column">Taco</div>
          <div className="column">$5.00</div>
          <button className="ui button">edit</button>
          <button className="ui button">delete</button>
        </div>
        <div className="row">
          <div className="column">2019-07-22</div>
          <div className="column">Food</div>
          <div className="column">Taco</div>
          <div className="column">$5.00</div>
          <button className="ui button">edit</button>
          <button className="ui button">delete</button>
        </div>
        <div className="row">
          <div className="column">2019-07-22</div>
          <div className="column">Food</div>
          <div className="column">Taco</div>
          <div className="column">$5.00</div>
          <button className="ui button">edit</button>
          <button className="ui button">delete</button>
        </div>
      </div>
    )
  }
}
