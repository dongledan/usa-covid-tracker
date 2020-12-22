import React from 'react'

import TableBody from './TableBody'
import Loading from './Loading'
import CountyMap from './maps/CountyMap'
import News from './News'
import {useSortableData, whichState} from './utils'

export default function Table(props) {
  const {day, prevDay, topDaily, isLoading, prevWeek, value} = props
  const {items, requestSort, sortConfig} = useSortableData(topDaily)
  const checkState = whichState(value)
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }
  return (
    <span>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="table-container">
          <div className="table-rank">
            <table className="table">
              <thead>
                <tr className="table-header">
                  <th>
                    <button
                      className="naked"
                      type="button"
                      onClick={() => requestSort('population')}
                    >
                      <div className="title">County</div>
                      <div className="pop">Population*</div>
                      <div
                        className={getClassNamesFor('population')}
                        style={{minHeight: '1.4em'}}
                      />
                    </button>
                  </th>

                  <th>
                    <button
                      className="naked"
                      onClick={() => requestSort('dailyRate')}
                    >
                      <div
                        className="title tooltip"
                        style={{fontStyle: 'normal'}}
                      >
                        Daily Case Rate Per 100K**
                        <span
                          className="tooltiptext"
                          style={{fontWeight: 'normal'}}
                        >
                          Average number of newly confirmed cases in the last 7
                          days per 100,000 residents
                        </span>
                      </div>
                      <div
                        className={getClassNamesFor('dailyRate')}
                        style={{minHeight: '1.4em'}}
                      />
                    </button>
                  </th>
                  <th>
                    <button
                      className="naked"
                      onClick={() => requestSort('dailyCases')}
                    >
                      <div className="title">Cases</div>
                      <div
                        className={getClassNamesFor('dailyCases')}
                        style={{minHeight: '1.4em'}}
                      />
                    </button>
                  </th>
                  <th>
                    <button
                      className="naked"
                      onClick={() => requestSort('dailyDeaths')}
                    >
                      <div className="title">Deaths</div>
                      <div
                        className={getClassNamesFor('dailyDeaths')}
                        style={{minHeight: '1.4em'}}
                      />
                    </button>
                  </th>
                </tr>
              </thead>
              {items.map((county, i) => (
                <TableBody
                  county={county}
                  day={day}
                  prevDay={prevDay}
                  prevWeek={prevWeek}
                  i={i}
                />
              ))}
            </table>
            <div className="caption">
              *Sourced from U.S. Census 2019 estimates
            </div>
            <div className="caption">
              **Learn more about{' '}
              <a
                style={{fontStyle: 'italic'}}
                href="https://covid19.gachd.org/daily-case-rate-per-100000/"
                rel="noreferrer"
                target="_blank"
              >
                Daily Case Rate Per 100K
              </a>
            </div>
          </div>
          <div className="right-container">
            {!checkState ? (
              <CountyMap
                value={value}
                topDaily={topDaily}
                checkState={checkState}
              />
            ) : (
              <span />
            )}
            <News />
          </div>
        </div>
      )}
    </span>
  )
}
