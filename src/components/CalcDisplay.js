import React, { Component } from 'react';

class CalcDisplay extends Component {
  render() {
    return (
      <div id="display">
        <div id="sub-display">
          {this.props.calculation}
        </div>
        <div id="main-display">
          {this.props.current}
        </div>
      </div>
    );
  }
}

export default CalcDisplay;
