import React from 'react';
import TableBody from './TableBody';
import Loading from './Loading';

export default function Table(props) {
  const { day, prevDay, topDaily, botDaily, isLoading } = props;
 
  return (
    <span>
    { 
      isLoading ?
        <Loading /> 
      :
        <div className="table-container">
          <div className="table-rank">
            <div className="table-name">Most Daily Cases</div>
            <table className="table">
                <thead>
                  <tr className="table-header">
                    <th>County</th>
                    <th>Cases</th>
                    <th>Deaths</th>
                  </tr>
                </thead>
                {topDaily.map((county, i) => (
                  <TableBody county={county} day={day} prevDay={prevDay} i={i}/>
                ))}
            </table>
          </div>
          <div className="table-rank">
            <div className="table-name">Least Daily Cases</div>
            <table className="table">
                <thead>
                  <tr className="table-header">
                    <th>County</th>
                    <th>Cases</th>
                    <th>Deaths</th>
                  </tr>
                </thead>
                {botDaily.map((county, i) => (
                  <TableBody county={county} day={day} prevDay={prevDay} i={i} />
                ))}
            </table>
          </div>
        </div>
      }
    </span>
  )
}
