import React, { Component } from 'react';

class CalcDisplay extends Component {
  render() {
    return (
      <div id="display-holder">
        <div id="calculation">
          {this.props.calculation}
        </div>
        <div id="display">
          {this.props.current}
        </div>
      </div>
    );
  }
}

export default CalcDisplay;
