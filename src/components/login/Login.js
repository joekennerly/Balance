import React, { Component } from "react"
import APIManager from "../../modules/APIManager"

export default class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  handleFieldChange = event => {
    console.log(this.state.username)
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  handleClick = () => {
      //fetch
      APIManager.get(`users?username=${this.state.username}`)
        .then(user => {
          //check for matching
          if (user.length === 0) window.alert("no user found!")
          else if (user[0].password === this.state.password) {
            console.log(user[0])
            //set sessionStorage
            sessionStorage.setItem("activeUser", user[0].id)
            this.props.setUser(user[0].id)
            //routing to dashboard
            this.props.history.push("/")
          }
          else window.alert("That password is incorrect")
        console.log(user)
      })
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <div className="ui input">
          <input
            id="username"
            required
            type="text"
            autoFocus
            placeholder="username"
            onChange={this.handleFieldChange}
            />
          <input
            id="password"
            required
            type="text"
            placeholder="password"
            onChange={this.handleFieldChange}
          />
          <button
            className="ui button primary"
            onClick={this.handleClick}
          ></button>
        </div>
      </div>
    )
  }
}
