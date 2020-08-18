import React from 'react';

import * as api from './api/apiService';

export default function App() {
  const testAPI = async () => {
    const result = await api.getAllGrades();
    console.log(result);
  };
  testAPI();
  return <h1>Olá, tudo bem</h1>;
}
