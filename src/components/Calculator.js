import React, { Component } from 'react';
import CalcDisplay from './CalcDisplay.js';
import CalcButton from './CalcButton.js';
import '../css/Calculator.css';


class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      calculation: []
    }

    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleDecimalClick = this.handleDecimalClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleEqualsClick = this.handleEqualsClick.bind(this);
  }

  isOperator(token) {
    return /(\+|-|\/|\*)/.test(token);
  }

  isNum(token) {
    return /(\d+|\d+\.\d+|0\.)/.test(token);
  }

  compute(calculation) {
    let result = Number(calculation[0]);

    for(let i = 1; i < calculation.length; i += 2) {
      let operator = calculation[i];
      let secondOperand = Number(calculation[i+1]);
      switch (operator) {
        case '+': result += secondOperand; break;
        case '-': result -= secondOperand; break;
        case '/': result /= secondOperand; break;
        case '*': result *= secondOperand; break;
        default: alert("could not process calculation"); return;
      }
    }

    return result;

  }

  handleNumberClick(event) {
    const current = this.state.current;
    const calculation = this.state.calculation;

    //if we have just performed a calculation, clear the old inputs
    if(calculation[calculation.length - 1] === '=') {
      this.setState({
        calculation: [],
        current: event.target.value
      });
      return;
    }

    //don't allow users to pad left side of value with zeros
    if(current === '0') {
      this.setState({current: event.target.value});
      return;
    }

    //if an operator was previously entered, then push that operator to the
    //pending calculation
    if(this.isOperator(current)) {
      this.setState({
        calculation: [...calculation, current],
        current: event.target.value
      });
      return;
    }

    //if there is nothing or an number inside current then append the new value
    //that was just pressed
    if(current.length == 0 || this.isNum(current)) {
      this.setState({current: current + event.target.value});
      return;
    }

  }

  handleDecimalClick(event) {

    const current = this.state.current;
    const calculation = this.state.calculation;

    //if we have just performed a calculation, clear the old inputs and append 0.
    if (calculation[calculation.length - 1] === '=') {
      this.setState({
        calculation: [],
        current: '0.'
      });
      return;
    }

    //if nothing is there append 0.
    if (current.length == 0) {
      this.setState({current: '0.'});
      return;
    }

    //if a number is there, check if it has a decimal, if not add decimal
    if(this.isNum(current) && !/\./.test(current)) {
      this.setState({current: current + '.'});
      return;
    }

    //if an operator is there, push the operator and add 0.
    if(this.isOperator(current)) {
      this.setState({
        calculation: [...calculation, current],
        current: '0.'
      });
      return;
    }


  }

  handleClearClick(event) {
    this.setState({calculation: [], current: ''});
  }

  handleOperatorClick(event) {
    const current = this.state.current;
    const calculation = this.state.calculation;

    //if a calculation was just performed, use the result as an operand for
    //the new one being entered
    if (calculation[calculation.length - 1] === '=') {
      this.setState({
        calculation: [current],
        current: event.target.value
      });
      return;
    }

    //if an operator has already been entered, change it to the new one that
    //has just been pressed
    if(this.isOperator(current)) {
      this.setState({
        current: event.target.value
      });
      return;
    }

    //remove trailing point from zero if '0.' is an operand
    if (current === '0.') {
      this.setState({
        calculation: [...calculation, '0'],
        current: event.target.value
      });
      return;
    }

    //if a number has been entered, add it as an operand to the pending calculation
    if (this.isNum(current)) {
      this.setState({
        calculation: [...calculation, current],
        current: event.target.value
      });
      return;
    }

  }

  handleEqualsClick(event) {
    const calculation = this.state.calculation;
    const current = this.state.current;

    //If there is no calculation to perform, do nothing
    if (calculation.length == 0 || calculation[calculation.length - 1] === '=') {
      return;
    }

    //if current value is a number, add it and perform calculation
    if (this.isNum(current)) {
      this.setState({calculation: [...calculation, current, '='], current: this.compute([...calculation, current]).toString()});
    }

    //if current value is an op, toss it and perform calculation
    if (this.isOperator(current)) {
      this.setState({calculation: [...calculation, '='], current: this.compute([...calculation]).toString()});
    }

  }

  render() {
    return (
      <div id="calculator">
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
              (id, value, arr) => {
                return <CalcButton
                          key={id}
                          id={id}
                          value={arr.length - 1 - value}
                          onClick={this.handleNumberClick}
                          className="num"
                        />;
              }
            )
          }
          <CalcButton id="decimal" value="." onClick={this.handleDecimalClick} />
        </div>
        <CalcButton id="equals" value="=" onClick={this.handleEqualsClick} />
      </div>
    )
  }
}

export default Calculator;
