import React, { Component } from 'react';
import Header from './components/header/Header';
import ProgressBarSalary from './components/progressBar/ProgressBarSalary';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 0,
    };
  }

  handleChangeFilter = (salary) => {
    this.setState({
      fullSalary: salary,
    });
  };

  render() {
    const { fullSalary } = this.state;
    return (
      <div className="container">
        <h1>React Salário</h1>
        <Header
          fullSalary={fullSalary}
          onChangeFilter={this.handleChangeFilter}
        />
      </div>
    );
  }
}
