import React, { Component } from 'react';

export default class Band extends Component {
  constructor() {
    super();

    this.state = {
      bandName: 'Eh nóis',
      bandMembers: [
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
      ],
    };
  }
  render() {
    const { bandName, bandMembers } = this.state;

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
  }
}
