import React, { Component } from 'react';
import css from './header.module.css';
import { calculateSalaryFrom } from './../helpers/salary';
import { formatNumber } from '../helpers/formatHelpers';
import ProgressBarSalary from '../progressBar/ProgressBarSalary';

export default class Header extends Component {
  handleInputChange = (event) => {
    const newValue = event.target.value;
    this.props.onChangeFilter(newValue);
  };

  render() {
    const { fullSalary } = this.props;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(fullSalary);
    return (
      <div>
        <label htmlFor="">Salário bruto</label>
        <input type="number" onChange={this.handleInputChange} />
        <br />

        <label>Base INSS:</label>
        <input
          type="text"
          className={css.inputsInline}
          value={formatNumber(baseINSS)}
          readOnly
        />

        <label>Desconto INSS:</label>
        <input
          type="text"
          className={css.inputsInline}
          value={formatNumber(discountINSS)}
          readOnly
        />

        <label>Base IRPF:</label>
        <input
          type="text"
          className={css.inputsInline}
          value={formatNumber(baseIRPF)}
          readOnly
        />

        <label>Desconto IRPF:</label>
        <input
          type="text"
          className={css.inputsInline}
          value={formatNumber(discountIRPF)}
          readOnly
        />

        <label>Salário Líquido:</label>
        <input type="text" value={formatNumber(netSalary)} readOnly />
        <ProgressBarSalary />
      </div>
    );
  }
}
