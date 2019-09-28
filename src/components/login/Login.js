import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  // Message,
  Segment
} from "semantic-ui-react"

export default class Login extends Component {
  state = {
    name: "",
    password: ""
  }

  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  submit = e => {
    e.preventDefault()
    //fetch
    APIManager.get(`users?name=${this.state.name}`).then(user => {
      //check for matching
      if (user.length === 0) window.alert("no user found!")
      else if (user[0].password === this.state.password) {
        //set sessionStorage
        sessionStorage.setItem("activeUser", user[0].id)
        this.props.setUser(user[0].id)
        //routing to dashboard
        this.props.history.push("/dashboard")
      } else window.alert("That password is incorrect")
    })
  }

  reg = () => {
    if (
      this.state.name === "" ||
      this.state.password === ""
    ) {window.alert("All fields must be filled out")}
    else {
      //check if username and email are unique
      fetch(`http://localhost:5002/users`)
        .then(res => res.json())
        .then(allUsers => {
          let filteredUsers = allUsers.filter(filterUsers => {
            return (
              filterUsers.name === this.state.name
            )
          })
          if (filteredUsers.length !== 0) window.alert("user already exists")
          else {
            //build and object of input values
            //post object to db
            fetch(`http://localhost:5002/users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(this.state)
            }).then(() => {
              fetch(
                `http://localhost:5002/users?name=${this.state.name}`
              )
                .then(res => res.json())
                .then(user => {
                  //set sessionStorage
                  sessionStorage.setItem("activeUser", user[0].id)
                  this.props.setUser(user[0].id)

                  //routing to dashboard
                  this.props.history.push("/")
                })
            })
          }
        })
    }
  }


  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header size="huge" as="h2" color="teal" textAlign="center">
            <Icon name="balance" />
          </Header>
          <Header as="h2" color="teal" textAlign="center">
            Please login or register
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                id="name"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleFieldChange}
                />
              <Form.Input
                id="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleFieldChange}
              />

              <Button onClick={this.submit} color="teal" size="large">
                Login
              </Button>
              <Button onClick={this.reg} color="teal" size="large">
                Register
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}
