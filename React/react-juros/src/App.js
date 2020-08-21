import React from 'react';
import Header from './components/Header';
import Form from './components/Form';

export default function App() {
  /*const [capitalInicial, setCapitalInicial] = useState(1);
  const [taxaJuroMensal, setJuroMensal] = useState(1);
  const [periodo, setPeriodo] = useState(1);*/

  return (
    <div className="container">
      <Header />
      <Form />
    </div>
  );
}
