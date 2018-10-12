import React, { Component } from 'react';

class CalcDisplay extends Component {
  render() {
    let current = this.props.calculation.match(/(\d+|\d+\.\d+|\+|-|\/|\*)$/);

    return (
      <div id="display">
        <div id="sub-display">
          {this.props.calculation}
        </div>
        <div id="main-display">
          {current}
        </div>
      </div>
    );
  }
}

export default CalcDisplay;
