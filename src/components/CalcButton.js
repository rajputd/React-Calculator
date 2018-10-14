import React, { Component } from 'react';

class CalcButton extends Component {
  render() {
    return (
      <button
        id={this.props.id}
        onClick={this.props.onClick}
        value={this.props.value}>
          {this.props.value}
      </button>
    )
  }
}

export default CalcButton;
