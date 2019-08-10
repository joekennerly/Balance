import React, { Component } from "react"
import { Route, Redirect, Link } from "react-router-dom"
import { withRouter } from "react-router"
import APIManager from "../modules/APIManager"
import Dashboard from "./dashboard/Dashboard"
import Login from "./login/Login"
import Expenses from "./expenses/Expenses"
import Income from "./income/Income"
import Register from "./login/Register"
import { Button, Icon, Menu, Segment, Sidebar } from "semantic-ui-react"

let moment = require("moment")
let thisMonth = moment().format("YYYY-MM")
class ApplicationViews extends Component {
  state = {
    expenses: [],
    income: [],
    categories: [],
    chartData: {},
    visable: true
  }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })
  componentDidMount() {
    //Filtering by month on income and expenses
    let newState = {}
    APIManager.get(`expenses?user_id=${sessionStorage.getItem("activeUser")}`)
      .then(
        expenses =>
          (newState.expenses = expenses.filter(expense =>
            expense.date.startsWith(thisMonth)
          ))
      )
      .then(() =>
        APIManager.get(
          `income?user_id=${sessionStorage.getItem("activeUser")}`
        ).then(
          income =>
            (newState.income = income.filter(income =>
              income.date.startsWith(thisMonth)
            ))
        )
      )
      .then(() =>
        APIManager.get(
          `categories?user_id=${sessionStorage.getItem("activeUser")}`
        ).then(categories => {
          newState.categories = categories
          newState.chartData = {
            labels: this.makeArray(categories, "name"),
            datasets: [
              {
                data: this.makeArray(categories, "amount"),
                backgroundColor: [
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "indigo",
                  "violet",
                  "brown",
                  "black",
                  "gray",
                  "white",
                  "pink",
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "indigo",
                  "violet",
                  "brown",
                  "black",
                  "gray",
                  "white"
                ]
              }
            ]
          }
        })
      )
      .then(() => this.setState(newState))
  }
  makeArray = (arr, prop) => arr.map(el => el[prop])
  sum = entryArray => {
    let total = 0
    entryArray.forEach(entry => (total += +entry.amount))
    return total.toFixed(2)
  }
  diff = (inTotal, exTotal) => (inTotal - exTotal).toFixed(2)
  isAuthenticated = () => sessionStorage.getItem("activeUser")
  deleteItem = (resource, id) => {
    let newObj = {}
    return APIManager.delete(resource, id)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => items.filter(arr => arr.date.startsWith(thisMonth)))
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  updateItem = (resource, id, editedObject) => {
    let newObj = {}
    return APIManager.put(resource, id, editedObject)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => items.filter(arr => arr.date.startsWith(thisMonth)))
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  addItem = (resource, item) => {
    let newObj = {}
    return APIManager.post(resource, item)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => items.filter(arr => arr.date.startsWith(thisMonth)))
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  deleteCat = (resource, id) => {
    let newObj = {}
    return APIManager.delete(resource, id)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  updateCat = (resource, id, editedObject) => {
    let newObj = {}
    return APIManager.put(resource, id, editedObject)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  addCat = (resource, item) => {
    let newObj = {}
    return APIManager.post(resource, item)
      .then(() =>
        APIManager.getAll(`${resource}?user_id=${this.props.activeUser}`)
      )
      .then(items => {
        newObj[resource] = items
        this.setState(newObj)
      })
  }
  updateChart = () => {
    let newState = {}
    newState.chartData = {
      labels: this.makeArray(this.state.categories, "name"),
      datasets: [
        {
          data: this.makeArray(this.state.categories, "amount"),
          backgroundColor: [
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet",
            "brown",
            "black",
            "gray",
            "white",
            "pink",
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet",
            "brown",
            "black",
            "gray",
            "white"
          ]
        }
      ]
    }
    this.setState(newState)
  }

  logout = () => {
    this.props.setUser(null)
    sessionStorage.clear()
  }

  render() {
    const visible = this.state.visible

    let totalIn = this.sum(this.state.income)
    let totalCat = this.sum(this.state.categories)
    let totalEx = this.sum(this.state.expenses)
    let totalBalance = this.diff(totalIn, totalEx)
    let budgetBalance = this.diff(totalIn, totalCat)

    return (
      <React.Fragment>
        {/* <Container> */}

        <Route
          exact
          path="/"
          render={props => {
            return <Redirect to="/dashboard" />
          }}
        />
        <Route
          path="/register"
          render={props => {
            return <Register setUser={this.props.setUser} {...props} />
          }}
        />
        <Route
          path="/login"
          render={props => {
            if (!this.isAuthenticated()) {
              return <Login setUser={this.props.setUser} {...props} />
            } else return <Redirect to="/" />
          }}
        />

        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            direction="left"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item as={Link} to="/dashboard">
              <Icon name="pie chart" />
              Budget
              {this.diff(
                this.sum(this.state.income),
                this.sum(this.state.expenses)
              )}
            </Menu.Item>
            <Menu.Item as={Link} to="/income">
              <Icon name="plus" />
              Income
              {this.sum(this.state.income)}
            </Menu.Item>
            <Menu.Item as={Link} to="/expenses">
              <Icon name="minus" />
              Expenses
              {this.sum(this.state.expenses)}
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="cog" />
              Logout
            </Menu.Item>
          </Sidebar>

          <Sidebar
            as={Menu}
            animation="overlay"
            direction="right"
            inverted
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item as="a" header>
              Budget Categories
            </Menu.Item>
            {this.state.categories.map(category => (
              <Menu.Item as="a" key={category.id} value={category.id}>
                {category.name} ${category.amount}
              </Menu.Item>
            ))}

          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic inverted>
              <Button.Group>
                <Button
                  inverted
                  size="huge"
                  disabled={visible}
                  onClick={this.handleShowClick}
                >
                  <Icon name="bars" />
                  Menu
                </Button>
              </Button.Group>

              <Route
                exact
                path="/dashboard"
                render={props => {
                  if (this.isAuthenticated()) {
                    return (
                      <Dashboard
                        activeUser={this.props.activeUser}
                        sum={this.sum}
                        diff={this.diff}
                        addItem={this.addCat}
                        deleteItem={this.deleteCat}
                        updateItem={this.updateCat}
                        income={this.state.income}
                        expenses={this.state.expenses}
                        categories={this.state.categories}
                        date={moment()}
                        chartData={this.state.chartData}
                        updateChart={this.updateChart}
                        thisMonth={thisMonth}
                        {...props}
                      />
                    )
                  } else return <Redirect to="/login" />
                }}
              />
              <Route
                exact
                path="/income"
                render={props => {
                  if (this.isAuthenticated()) {
                    return (
                      <Income
                        activeUser={this.props.activeUser}
                        sum={this.sum}
                        diff={this.diff}
                        addItem={this.addItem}
                        deleteItem={this.deleteItem}
                        updateItem={this.updateItem}
                        income={this.state.income}
                        expenses={this.state.expenses}
                        categories={this.state.categories}
                        date={moment().format("YYYY-MM-DD")}
                        thisMonth={thisMonth}
                        {...props}
                      />
                    )
                  } else return <Redirect to="/login" />
                }}
              />
              <Route
                exact
                path="/expenses"
                render={props => {
                  if (this.isAuthenticated()) {
                    return (
                      <Expenses
                        activeUser={this.props.activeUser}
                        sum={this.sum}
                        diff={this.diff}
                        addItem={this.addItem}
                        deleteItem={this.deleteItem}
                        updateItem={this.updateItem}
                        income={this.state.income}
                        expenses={this.state.expenses}
                        categories={this.state.categories}
                        date={moment().format("YYYY-MM-DD")}
                        thisMonth={thisMonth}
                        {...props}
                      />
                    )
                  } else return <Redirect to="/login" />
                }}
              />
              {/* dynamically route expense categories */}
              <Route
                path="/expenses/:categoryName"
                render={props => {
                  if (this.isAuthenticated()) {
                    let category = this.state.categories.find(
                      category =>
                        category.name === props.match.params.categoryName
                    )
                    if (!category) {
                      category = { id: 404, name: "404 not found" }
                    }
                    let filtered = this.state.expenses.filter(
                      filtExpenses => filtExpenses.category_id === category.id
                    )
                    return (
                      <Expenses
                        category={category}
                        expenses={filtered}
                        activeUser={this.props.activeUser}
                        sum={this.sum}
                        diff={this.diff}
                        addItem={this.addItem}
                        deleteItem={this.deleteItem}
                        updateItem={this.updateItem}
                        income={this.state.income}
                        categories={this.state.categories}
                        date={moment().format("YYYY-MM-DD")}
                        thisMonth={thisMonth}
                        {...props}
                      />
                    )
                  }
                }}
              />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        {/* </Container> */}
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)
