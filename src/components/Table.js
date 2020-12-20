import React from 'react'

import TableBody from './TableBody'
import Loading from './Loading'
import News from './News'
import {useSortableData} from './utils'

export default function Table(props) {
  const {day, prevDay, topDaily, isLoading, prevWeek, news} = props
  const {items, requestSort, sortConfig} = useSortableData(topDaily)
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
                      <div className="title">
                        Daily New Cases Rate Per 100k**
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
            <div className="caption tooltip">
              **Learn more about Daily New Cases Rate
              <span className="tooltiptext two">
                <span>
                  • Average number of new cases in the last 7 days per 100,000
                  residents.
                </span>
                <div>• Why sort by Daily Rate? </div>
                <div>
                  It takes population in account to better compare larger and
                  smaller counties.
                </div>
                <div className="color-container">
                  <div className="color dark-red"></div> Severe outbreak; super
                  danger
                </div>
                <div className="color-container">
                  <div className="color red2"></div> Active outbreak; danger
                  zone
                </div>
                <div className="color-container">
                  <div className="color orange"></div> Moderate outbreak; uh oh
                </div>
                <div className="color-container">
                  <div className="color yellow"></div> Slow growth; not too
                  shabby
                </div>
                <div className="color-container">
                  <div className="color green"></div> On track; gold star{' '}
                </div>
              </span>
            </div>
          </div>
          {news.length ? <News news={news} /> : <span />}
        </div>
      )}
    </span>
  )
}
