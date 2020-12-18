import React from 'react';
import TableBody from './TableBody';
import Loading from './Loading';

export default function Table(props) {
  const { day, prevDay, topDaily, botDaily, isLoading, prevWeek } = props;
 
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
                    <th>
                      <div>County</div>
                      <div className="pop">Population*</div>
                    </th>
                    <th>
                    <a className="learn" href="https://covid19.gachd.org/daily-case-rate-per-100000/"  rel="noreferrer noopener" target="_blank">
                      <div className="tooltip">
                        Daily New Cases
                        <span className="tooltiptext">
                          <span>
                            Average number of new cases in the last 7 days per 100,000 residents. <strong>The higher the rate, the more likely you are exposed</strong>.
                          </span>
                        </span>
                      </div>
                      </a>
                    </th>
                    <th>Cases</th>
                    <th>Deaths</th>
                  </tr>
                </thead>
                {topDaily.map((county, i) => (
                  <TableBody county={county} day={day} prevDay={prevDay} prevWeek={prevWeek} i={i}/>
                ))}
            </table>
          </div>
          <div className="table-rank">
            <div className="table-name">Least Daily Cases</div>
            <table className="table">
                <thead>
                  <tr className="table-header">
                  <th>
                      <div>County</div>
                      <div className="pop">Population*</div>
                    </th>
                    <th>Daily New Cases</th>
                    <th>Cases</th>
                    <th>Deaths</th>
                  </tr>
                </thead>
                {botDaily.map((county, i) => (
                  <TableBody county={county} day={day} prevDay={prevDay} prevWeek={prevWeek} i={i} />
                ))}
            </table>
          </div>
          <div className="caption">*Sourced from U.S. Census 2019 estimates</div>
        </div>
      }
    </span>
  )
}
