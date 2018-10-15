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
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleEqualsClick = this.handleEqualsClick.bind(this);
  }

  handleNumberClick(event) {
    const current = this.state.current;

    if(/(\+|-|\/|\*)/.test(current)) {
      this.setState({
        calculation: this.state.calculation + current,
        current: event.target.value
      });
      return;
    }

    if(current.length == 0 || /(\d|\d\.\d|\.)/.test(current)) {
      this.setState({current: current + event.target.value});
      return;
    }

  }

  handleDecimalClick(event) {

    const current = this.state.current;
    let append = '';

    //if nothing is there append 0.
    if (current.length == 0) {
      this.setState({current: '0.'});
      return;
    }

    //if a number is there, check if it has a decimal, if not add decimal
    if(/(\d|\d\.\d)/.test(current) && !/\./.test(current)) {
      this.setState({current: current + '.'});
      return;
    }

    //if an operator is there, push the operator and add 0.
    if(/(\+|-|\/|\*)/.test(current)) {
      this.setState({
        calculation: this.state.calculation + current,
        current: '0.'
      });
      return;
    }


  }

  handleClearClick(event) {
    this.setState({calculation: '', current: ''});
  }

  handleOperatorClick(event) {
    const current = this.state.current;

    if (/(\d|\d\.\d)/.test(current)) {
      this.setState({
        calculation: this.state.calculation + current,
        current: event.target.value
      });
      return;
    }

  }

  handleEqualsClick(event) {
    const calculation = this.state.calculation;

    //If there is no calculation to perform, do nothing
    if (calculation.length == 0) {
      return;
    }

    const current = this.state.current;

    //if current value is a number, add it and perform calculation
    if (/(\d|\d\.\d)/.test(current)) {
      this.setState({calculation: calculation + current + '=', current: ''});
    }

    //if current value is an op, toss it and perform calculation
    if (/(\+|-|\/|\*)/.test(current)) {
      this.setState({calculation: calculation + '=', current: ''});
    }

  }

  render() {
    return (
      <div>
        <CalcDisplay calculation={this.state.calculation} current={this.state.current}/>
        <CalcButton id="clear" value="AC" onClick={this.handleClearClick} />
        {
          [
            {id: 'add', value: '+'},
            {id: 'subtract', value: '-'},
            {id: 'multiply', value: '*'},
            {id: 'divide', value: '/'}
          ].map(
            (operator) => {
              return <CalcButton
                        key={operator.id}
                        id={operator.id}
                        value={operator.value}
                        onClick={this.handleOperatorClick}
                     />;
            }
          )
        }
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
        <CalcButton id="equals" value="=" onClick={this.handleEqualsClick} />
      </div>
    )
  }
}

export default Calculator;
