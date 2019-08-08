import React, { Component } from "react"
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react"

export default class Register extends Component {
  state = {
    name: "",
    password: ""
  }

  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  submit = () => {
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
          <Header as="h2" color="teal" textAlign="center">
            Create a new account
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

              <Button onClick={this.submit} color="teal" fluid size="large">
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <a href="/login">Sign In</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
