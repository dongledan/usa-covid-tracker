import React from 'react'
import { nearestHundredth, color } from './utils'

export default function TableBody(props) {
  const { county, day, prevDay, prevWeek, i } = props;
  const dailyRate = nearestHundredth((((county.timeline.cases[day] - county.timeline.cases[prevWeek])/7)/parseInt(county.population.replace(/,/g, '')))*100000);
  
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
         <td style={{color: `${color(dailyRate)}`, fontWeight: '600'}}>
            <span className="background">{ county.population !== 'N/A' ? dailyRate : 'N/A'}</span>
          </td>
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
