import React from 'react';
import TableBody from './TableBody';

export default function Table(props) {
  const { day, prevDay, topTen, botTen } = props;
 
  return (
    <div className="table-container">
      <div className="table-rank">
        <h1>Most Daily Cases</h1>
        <table className="table">
            <thead>
              <tr className="table-header">
                <th>County</th>
                <th>Cases</th>
                <th>Deaths</th>
              </tr>
            </thead>
            {topTen.map((county, i) => (
              <TableBody county={county} day={day} prevDay={prevDay} i={i}/>
            ))}
        </table>
      </div>
      <div className="table-rank">
        <h1>Least Daily Cases</h1>
        <table className="table">
            <thead>
              <tr className="table-header">
                <th>County</th>
                <th>Cases</th>
                <th>Deaths</th>
              </tr>
            </thead>
            {botTen.map((county, i) => (
              <TableBody county={county} day={day} prevDay={prevDay} i={i} />
            ))}
        </table>
      </div>
    </div>
  )
}
