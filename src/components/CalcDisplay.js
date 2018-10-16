import React, { Component } from 'react';
import '../css/CalcDisplay.css';

class CalcDisplay extends Component {
  render() {
    const calculation = this.props.calculation.join("");
    const current = this.props.current;
    return (
      <div id="display-holder">
        <div id="calculation">
          {calculation.length > 15 ? calculation.slice(0,13) + "..." : calculation}
        </div>
        <div id="display">
          {current.length > 15 ? current.slice(0,13) + "..." : current}
        </div>
      </div>
    );
  }
}

export default CalcDisplay;
