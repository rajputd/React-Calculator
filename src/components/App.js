import React, { Component } from 'react';
import Calculator from './Calculator.js';
import '../css/App.css';

class App extends Component{
  render() {
    return (
      <div id="App">
        <h1 class="center">React Calculator</h1>
        <Calculator />
        <p class="center">A project by Dileep Rajput, inspired by Peter Weinberg</p>
      </div>
    );
  }
}

export default App;
