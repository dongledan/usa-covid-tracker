import React from 'react'
import { nearestHundredth } from './utils'

export default function TableBody(props) {
  const { county, day, prevDay, prevWeek, i } = props;
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
         <td>{ county.population !== 'N/A' ? nearestHundredth((((county.timeline.cases[day] - county.timeline.cases[prevWeek])/7)/parseInt(county.population.replace(/,/g, '')))*100000) : 'N/A'}</td>
        <td>
          {county.timeline.cases[day] - county.timeline.cases[prevDay] > 0 ? 
            `+${county.timeline.cases[day] - county.timeline.cases[prevDay]}` 
          : 
            county.timeline.cases[day] - county.timeline.cases[prevDay]}
        </td>
        <td> 
          {county.timeline.deaths[day] - county.timeline.deaths[prevDay] > 0 ? 
            `+${county.timeline.deaths[day] - county.timeline.deaths[prevDay]}` 
          : 
            county.timeline.deaths[day] - county.timeline.deaths[prevDay]}</td>
      </tr>
    </tbody>
  )
}
