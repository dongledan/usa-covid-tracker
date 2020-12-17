import React from 'react'

export default function TableBody(props) {
  const { county, day, prevDay, i } = props;
  return (
    <tbody key={county.county + i}>
      <tr>
        <td className="table-county">
          <div className="rank">{i + 1}.</div> 
          <div className="county-container">
            <div className="county"> {county.county}</div>
            <div className="pop">{county.population}</div>
          </div>
         </td>
        <td>{county.timeline.cases[day] - county.timeline.cases[prevDay]}</td>
        <td>{county.timeline.deaths[day] - county.timeline.deaths[prevDay]}</td>
      </tr>
    </tbody>
  )
}
