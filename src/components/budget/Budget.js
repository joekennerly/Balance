import React, { Component } from "react"
import Categories from "../form/Categories"
// import Totals from "../totals/Totals"

export default class Budget extends Component {
  currentYear = this.props.date.format("YYYY")
  currentMonth = this.props.date.format("MM")
  currentDay = this.props.date.format("DD")

  total = property => this.props.sum(this.props[property])
  filterByDate(resourceArray, time) {
    let filtered = []
    if (time === this.currentYear) {
      filtered = this.props[resourceArray].filter(resourceElement => {
        console.log(resourceElement.date.split("-")[0])
        return resourceElement.date.split("-")[0] === time
      })
    } else if (time === this.currentMonth) {
      filtered = this.props[resourceArray].filter(resourceElement => {
        console.log(resourceElement.date.split("-")[1])
        return resourceElement.date.split("-")[1] === time
      })
    }
    console.log(filtered)
  }

  calcPercent = (amount) => ((amount/this.props.total("income")) * 100).toFixed(2)
  render() {
    return (
      <div>
        <p>
          Today is {this.currentMonth}-{this.currentDay}-{this.currentYear}
        </p>
        <h1>Total Income: {this.total("income")}</h1>
        <h3>Expense Categories</h3>
        <Categories {...this.props} />
      </div>
    )
  }
}
