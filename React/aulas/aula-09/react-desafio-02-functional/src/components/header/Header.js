import React from 'react';
import { formatNumber } from '../../helpers/formatHelpers';
import css from './header.module.css';

export default function Header(props) {
  const handleInputChange = (event) => {
    const NewText = event.target.value;

    props.onChangeFilter(NewText);
  };

  const { filter, countryCount, totalPopulation } = props;
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
