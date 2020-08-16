import React from 'react';
import { formatNumber } from '../../helpers/formatHelpers';
import css from './header.module.css';

export default function Header({
  filter,
  countryCount,
  totalPopulation,
  onChangeFilter,
}) {
  const handleInputChange = (event) => {
    const NewText = event.target.value;

    onChangeFilter(NewText);
  };

  return (
    <div className={css.flexRow}>
      <input
        placeholder="Filtro"
        style={{ width: '200px' }}
        type="text"
        value={filter}
        onChange={handleInputChange}
      />{' '}
      |
      <span className={css.info}>
        Países: <strong>{countryCount}</strong>
      </span>{' '}
      |
      <span className={css.info}>
        População: <strong>{formatNumber(totalPopulation)}</strong>
      </span>
    </div>
  );
}
