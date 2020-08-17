import React, { useState } from 'react';

const BAND_MEMBERS = [
  {
    id: 1,
    name: 'Cristiano Ap Lázaro',
    instrument: 'Saxofone',
  },
  {
    id: 2,
    name: 'Clóvis Lázaro Júnior',
    instrument: 'Violoncelo',
  },
  {
    id: 3,
    name: 'Silvia Cardoso',
    instrument: 'Órgão',
  },
];

export default function Band() {
  const [bandMembers, setBandMembers] = useState(BAND_MEMBERS);
  const [bandName, setBandName] = useState('Rush');

  return (
    <div>
      <h4>{bandName}</h4>
      <ul>
        {bandMembers.map(({ id, name, instrument }) => {
          return (
            <li>
              {name} - {instrument}
            </li>
          );
        })}
      </ul>
    </div>
  );
  //}
}
