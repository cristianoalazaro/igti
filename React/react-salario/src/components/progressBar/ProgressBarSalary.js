import React, { Component } from 'react';
import css from './progressBarSalary.module.css';

export default class ProgressBarSalary extends Component {
  render() {
    return (
      <div className={css.main}>
        <div className={css.inss}></div>
        <div className={css.irpf}></div>
        <div className={css.liquido}></div>
      </div>
    );
  }
}
