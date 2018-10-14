import React, { Component } from 'react';
import CalcDisplay from './CalcDisplay.js';
import CalcButton from './CalcButton.js';


class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      calculation: ''
    }

    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleDecimalClick = this.handleDecimalClick.bind(this);
  }

  handleNumberClick(event) {
    const current = this.state.current;

    if(current.length == 0 || /(\d|\d\.\d|\.)/.test(current)) {
      this.setState({current: current + event.target.value});
    }

  }

  handleDecimalClick(event) {
    if(!/\./.test(this.state.current)) {
      this.setState({current: this.state.current + event.target.value});
    }
  }

  render() {
    return (
      <div>
        <CalcDisplay calculation={this.state.calculation} current={this.state.current}/>
        <div id="numpad">
          {
            ['nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one', 'zero'].map(
              (id, value) => {
                return <CalcButton
                          key={id}
                          id={id}
                          value={value}
                          onClick={this.handleNumberClick}
                        />;
              }
            )
          }
        </div>
        <CalcButton id="decimal" value="." onClick={this.handleDecimalClick} />
      </div>
    )
  }
}

export default Calculator;
