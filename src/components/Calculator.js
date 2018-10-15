import React, { Component } from 'react';
import CalcDisplay from './CalcDisplay.js';
import CalcButton from './CalcButton.js';


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

    if(this.isOperator(current)) {
      this.setState({
        calculation: [...this.state.calculation, current],
        current: event.target.value
      });
      return;
    }

    if(current.length == 0 || this.isNum(current)) {
      this.setState({current: current + event.target.value});
      return;
    }

  }

  handleDecimalClick(event) {

    const current = this.state.current;

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
        calculation: [...this.state.calculation, current],
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

    if(this.isOperator(current)) {
      this.setState({
        current: event.target.value
      });
    }

    if (this.isNum(current)) {
      this.setState({
        calculation: [...this.state.calculation, current],
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
    if (this.isNum(current)) {
      this.setState({calculation: [...calculation, current, '='], current: this.compute([...calculation, current])});
    }

    //if current value is an op, toss it and perform calculation
    if (this.isOperator(current)) {
      this.setState({calculation: [...calculation, '='], current: this.compute([...calculation])});
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
