import React from 'react';

export default function Installment({
  capitalInicial,
  taxaJurosMensal,
  periodo,
  visibled,
}) {
  const handleList = () => {
    const list = [];
    for (let i = 1; i <= periodo; i++) {}
  };

  return (
    <div style={{ display: visibled }}>
      <h5>Resultado</h5>
      <div style={styles.result} className="result">
        <p>{capitalInicial}</p>
        <p>{taxaJurosMensal}</p>
        <p>{periodo}</p>
      </div>
    </div>
  );
}

const styles = {
  result: {
    border: 'solid 1px black',
    width: '200px',
  },
};
