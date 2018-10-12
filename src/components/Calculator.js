import React, { Component } from 'react';
import CalcDisplay from './CalcDisplay.js';

class Calculator extends Component {

  render() {
    let calculation = "";

    return (
      <div>
        <CalcDisplay calculation={calculation}/>
      </div>
    )
  }
}

export default Calculator;
