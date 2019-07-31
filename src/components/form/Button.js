import React, { Component } from 'react'

export default class Button extends Component {
  render() {
    //Auto formatted button
    //Uses "text" prop for the button label
    //Uses "onClick" prop to dynamically import callback functions
    return (
      <button
        className="ui button"
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    )
  }
}
