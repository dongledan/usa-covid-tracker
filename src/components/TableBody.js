import React from 'react'

export default function TableBody(props) {
  const { county, day, prevDay, i } = props;
  return (
    <tbody key={county.county}>
      <tr>
        <td>{i + 1}. {county.county}</td>
        <td>{county.timeline.cases[day] - county.timeline.cases[prevDay]}</td>
        <td>{county.timeline.deaths[day] - county.timeline.deaths[prevDay]}</td>
      </tr>
    </tbody>
  )
}
