import React, { Component } from 'react'
// import Totals from "../totals/Totals"
export default class Budget extends Component {
  currentYear = this.props.date.format("YYYY")
  currentMonth = this.props.date.format("MM")
  currentDay = this.props.date.format("DD")

  total = (property) => this.props.sum(this.props[property])

  filterByDate(resourceArray, time) {
    let filtered = []
    if (time === this.currentYear) {
      filtered = this.props[resourceArray].filter(resourceElement => {
        console.log(resourceElement.date.split("-")[0])
        return resourceElement.date.split("-")[0] === time
      })
    }
    else if (time === this.currentMonth) {
      filtered = this.props[resourceArray].filter(resourceElement => {
        console.log(resourceElement.date.split("-")[1])
        return resourceElement.date.split("-")[1] === time
      })
    }
    console.log(filtered)
  }

  calcPercent = (amount) => {
    return ((amount/this.total("income")) * 100).toFixed(2)
  }


  render() {
    console.log(this.total("income"))
    return (
      <div>
        <p>Today is {this.currentMonth}-{this.currentDay}-{this.currentYear}</p>
        {/* <Totals {...this.props} /> */}
        <h1>Total Income: {this.total("income")}</h1>
        <ul>
          <h3>Expense Categories</h3>
          <li>food: $50 ({this.calcPercent(50)}%)</li>
          <li>car: $40 ({this.calcPercent(40)}%)</li>
          <li>house: $100 ({this.calcPercent(100)}%)</li>
          <li>cats: $20 ({this.calcPercent(20)}%)</li>
        </ul>
      </div>
    )
  }
}
