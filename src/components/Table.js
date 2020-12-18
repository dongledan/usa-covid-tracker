import React from 'react';
import TableBody from './TableBody';
import Loading from './Loading';
import { useSortableData} from './utils'

export default function Table(props) {
  const { day, prevDay, topDaily, isLoading, prevWeek } = props;
  const { items, requestSort, sortConfig } = useSortableData(topDaily);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <span>
    { 
      isLoading ?
        <Loading /> 
      :
        <div className="table-container">
          <div className="table-rank">
            <table className="table">
                <thead>
                  <tr className="table-header">
                    <button className="naked" type="button" onClick={() => requestSort('population')}>
                      <th>
                        <div className="title">
                          County
                          <span className={getClassNamesFor('population')} />
                        </div>
                        <div className="pop">Population*</div>
                      </th>
                    </button>
                    <th>
                      <button className="naked" type="button" onClick={() => requestSort('dailyRate')}>
                        <div className="title">
                          Daily New Cases Rate Per 100k**
                          <span className={getClassNamesFor('dailyRate')} />
                      </div>
                      </button>
                    </th>
                    <th>
                      <button className="naked" type="button" onClick={() => requestSort('dailyCases')}>
                        <div className="title">
                          Cases
                          <span className={getClassNamesFor('dailyCases')} />
                        </div>
                      </button>
                    </th>
                    <th>
                      <button className="naked" type="button" onClick={() => requestSort('dailyDeaths')}>
                        <div className="title">
                          Deaths
                          <span className={getClassNamesFor('dailyDeaths')} />
                        </div>
                      </button>
                    </th>
                   
                  </tr>
                </thead>
                {items.map((county, i) => (
                  <TableBody county={county} day={day} prevDay={prevDay} prevWeek={prevWeek} i={i}/>
                ))}
            </table>
            <div className="caption">*Sourced from U.S. Census 2019 estimates</div>
            <div className="caption tooltip">
              **Learn more about Daily New Cases Rate
              <span className="tooltiptext">
                <span>
                • Average number of new cases in the last 7 days per 100,000 residents.
                </span>
                <div>• Why sort by Daily Rate? </div>
                <div>It takes population in account to better compare larger and smaller counties.</div>
                <div className="color-container"><div className="color dark-red"></div> Severe outbreak; super danger</div>
                <div className="color-container"><div className="color red2"></div> Active outbreak; danger zone</div>
                <div className="color-container"><div className="color orange"></div> Moderate outbreak; uh oh</div>
                <div className="color-container"><div className="color yellow"></div> Slow growth; not too shabby</div>
                <div className="color-container"><div className="color green"></div> On track; gold star </div>
              </span>
            </div>
          </div>
        </div>
      }
    </span>
  )
}
