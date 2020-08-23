import React from 'react';
import Installment from './Installment';

export default function Installments(parcelas) {
  return (
    <div>
      <h1>
        <Installment parcelas={parcelas} />
      </h1>
    </div>
  );
}
