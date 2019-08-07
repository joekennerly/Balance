import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
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

  render() {
    // console.log(this.state)
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
                placeholder="E-mail address"
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
