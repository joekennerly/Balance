import React from "react"
import "./App.css"
import Dashboard from "./components/dashboard/Dashboard"
import Login from "./components/login/Login"

function App() {
  if (sessionStorage.length === 0) {
    return (
      <React.Fragment>
        <Login />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Dashboard />
      </React.Fragment>
    )
  }
}

export default App
