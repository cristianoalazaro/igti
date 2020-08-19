import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';
import spinner from './components/Spinner';
import Spinner from './components/Spinner';
import GradesControl from './components/GradesControl';

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();

      setTimeout(() => {
        setAllGrades(grades);
      }, 2000);
    };
    // api.getAllGrades().then((grades) => {
    //   setTimeout(() => {
    //     setAllGrades(grades);
    //   }, 2000);
    // });
    getGrades();
  }, []);

  const handleDelete = () => {
    console.log('handleDelete');
  };

  const handlePersist = () => {
    console.log('handlePersist');
  };

  return (
    <div>
      <h1 className="center">Controle de Notas</h1>
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
      {allGrades.length == 0 && <Spinner />}
    </div>
  );
}
