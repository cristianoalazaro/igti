import React, { useState } from 'react';
//import Installments from './Installments';
import { useEffect } from 'react';

export default function Form() {
  const [capitalInicial, setCapitalInicial] = useState(1);
  const [taxaJurosMensal, setTaxaJurosMensal] = useState(1);
  const [periodo, setPeriodo] = useState(1);
  const [parcelas, setParcelas] = useState([]);

  let aux = capitalInicial;
  //let percentage = aux;
  let totalPercentage = 0;
  let totalNewValue = 0;

  useEffect(() => {
    const parcelas = [];
    for (let i = 0; i < periodo; i++) {
      let newValue = aux;
      //let totalNewValue = 0;
      let percentage = (aux / 100) * taxaJurosMensal + aux;
      percentage -= aux;
      percentage /= aux;
      percentage *= 100;
      totalPercentage += percentage;

      parcelas.push({
        id: i + 1,
        value: (newValue / 100) * taxaJurosMensal,
        newValue: (newValue / 100) * taxaJurosMensal + newValue,
        totalNewValue: (newValue / 100) * taxaJurosMensal + totalNewValue,
        percentage: totalPercentage,
      });
      newValue += parcelas[i].value;
      totalNewValue += parcelas[i].value;
      aux = newValue;
    }
    setParcelas(parcelas);
    const parcelasTotal = parcelas.map(
      ({ id, newValue, totalNewValue, percentage }) => {
        return {
          id,
          valor: newValue,
          total: totalNewValue,
          porcentagem: percentage,
        };
      }
    );
    console.log(parcelasTotal);
  }, [capitalInicial, taxaJurosMensal, periodo]);

  return (
    <div>
      <form className="col s12">
        <div className="row">
          <div className="input-field col s4">
            <input
              id="input-montante-inicial"
              type="number"
              min="1"
              max="100000"
              value={capitalInicial}
              autoFocus
              onChange={({ target }) => setCapitalInicial(Number(target.value))}
            />
            <label className="active" htmlFor="input-montante-inicial">
              Montante inicial:
            </label>
          </div>

          <div className="input-field col s4">
            <input
              id="input-juros-mensal"
              type="number"
              min="-12"
              max="12"
              step="0.1"
              value={taxaJurosMensal}
              onChange={({ target }) =>
                setTaxaJurosMensal(Number(target.value))
              }
            />
            <label className="active" htmlFor="input-juros-mensal">
              Taxa de Juros Mensal:
            </label>
          </div>

          <div className="input-field col s4">
            <input
              id="input-periodo"
              type="number"
              min="1"
              max="36"
              onChange={({ target }) => setPeriodo(Number(target.value))}
            />
            <label className="active" htmlFor="input-periodo">
              Período (meses):
            </label>
          </div>
        </div>
      </form>
      <div className="centered"></div>
      <hr />
    </div>
  );
}
