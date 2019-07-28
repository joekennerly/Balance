import React, { Component } from "react"
import Button from "../form/Button"
import APIManager from "../../modules/APIManager"
export default class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  submit = () => {
    console.log("submit login")
    console.log(this.props.activeUser)
    //fetch
    APIManager.get(`users?username=${this.state.username}`)
      .then(user => {
        //check for matching
        if (user.length === 0) window.alert("no user found!")
        else if (user[0].password === this.state.password) {
          //set sessionStorage
          sessionStorage.setItem("activeUser", user[0].id)
          this.props.setUser(user[0].id)
          //routing to dashboard
          this.props.history.push("/")
        }
        else window.alert("That password is incorrect")
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
          <Button
            text="Login"
            onClick={this.submit}
          />
        </div>
      </div>
    )
  }
}
