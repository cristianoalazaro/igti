import React from 'react';
import Installment from './Installment';

export default function Installments({
  capitalInicial,
  taxaJurosMensal,
  periodo,
  visibled,
}) {
  return (
    <Installment
      capitalInicial={capitalInicial}
      taxaJurosMensal={taxaJurosMensal}
      periodo={periodo}
      visibled={visibled}
    />
  );
}
