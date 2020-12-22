import React from 'react'
import {color} from './utils'

export default function TableBody(props) {
  const {county, i} = props

  return (
    <tbody key={county.county + i}>
      <tr>
        <td className="table-county margin">
          <div className="rank">{i + 1}.</div>
          <div className="county-container">
            <div className="county"> {county.county}</div>
            <div className="pop">
              {county.population !== '00' ? county.population : 'N/A'}
            </div>
          </div>
        </td>
        <td className="margin">
          <span
            className="background"
            style={{background: `${color(county.dailyRate)}`}}
          >
            {county.population !== '00' ? county.dailyRate : 'N/A'}
          </span>
        </td>
        <td className="margin">
          {county.dailyCases > 0 ? `+` : ''}
          {county.dailyCases.toLocaleString()}
        </td>
        <td className="margin">
          {county.dailyDeaths > 0 ? `+` : ''}
          {county.dailyDeaths}
        </td>
      </tr>
    </tbody>
  )
}
