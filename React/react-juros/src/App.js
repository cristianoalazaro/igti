import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
//import Installment from './components/Installment';

export default function App() {
  /*const [capitalInicial, setCapitalInicial] = useState(1);
  const [taxaJuroMensal, setJuroMensal] = useState(1);
  const [periodo, setPeriodo] = useState(1);
  const [countParcelas, setCountParcelas] = useState([]);*/

  return (
    <div className="container">
      <Header />
      <Form />
    </div>
  );
}
