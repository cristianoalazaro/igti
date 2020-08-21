import React, { useState } from 'react';
import Installments from './Installments';

export default function Form() {
  const [capitalInicial, setCapitalInicial] = useState(1);
  const [taxaJurosMensal, setTaxaJurosMensal] = useState(1);
  const [periodo, setPeriodo] = useState(1);
  const [visibled, setVisibled] = useState('none');

  const handleCapitalInicial = (event) => {
    setCapitalInicial(event.target.value);
    unvisibleResult();
  };

  const handleJurosMensal = (event) => {
    setTaxaJurosMensal(event.target.value);
    unvisibleResult();
  };

  const handlePeriodo = (event) => {
    setPeriodo(event.target.value);
    unvisibleResult();
  };

  const handleResult = () => {
    setVisibled('block');
  };

  const unvisibleResult = () => {
    setVisibled('none');
  };

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
              onChange={handleCapitalInicial}
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
              onChange={handleJurosMensal}
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
              onChange={handlePeriodo}
            />
            <label className="active" htmlFor="input-periodo">
              Período (meses):
            </label>
          </div>
        </div>
      </form>
      <div className="centered">
        <button
          className="waves-effect waves-light btn green dark-4"
          onClick={handleResult}
        >
          Calcular
        </button>
      </div>
      <hr />
      <Installments
        capitalInicial={capitalInicial}
        taxaJurosMensal={taxaJurosMensal}
        periodo={periodo}
        visibled={visibled}
      />
    </div>
  );
}
