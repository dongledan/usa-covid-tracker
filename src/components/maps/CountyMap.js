import React, {useState} from 'react'
import {ComposableMap, Geographies, Geography} from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'
import {stateCenter} from '../utils/us_state_centers'
import {getKeyByValue, color, search} from '../utils'
import {mapStates} from '../utils/states'

const CountyMap = (props) => {
  const {value, topDaily} = props
  const stateId = getKeyByValue(mapStates, value)
  const state = stateCenter[stateId]
  const counties = require(`./data/${stateId}.json`)
  const [content, setContent] = useState('')

  return (
    <div className="county-map-container">
      <div className="state-name">{mapStates[stateId]}</div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          rotate: state.rotate ? state.rotate : null,
          scale: state.scale ? state.scale : 4000,
          center: [state.Longitude, state.Latitude],
        }}
        data-tip=""
      >
        <Geographies geography={counties}>
          {({geographies}) =>
            geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke={'#000'}
                  fill={
                    search(geo.properties.NAME.toLowerCase(), topDaily)
                      ? color(
                          search(geo.properties.NAME.toLowerCase(), topDaily)[
                            'dailyRate'
                          ]
                        )
                      : '#ddd'
                  }
                  style={{
                    cursor: 'default',
                    default: {outline: 'none'},

                    hover: {
                      opacity: '0.5',
                      outline: 'none',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                  onMouseEnter={() => {
                    const {NAME} = geo.properties
                    setContent(
                      `${NAME}, ${
                        search(geo.properties.NAME.toLowerCase(), topDaily)[
                          'dailyRate'
                        ]
                      }`
                    )
                  }}
                  onMouseLeave={() => {
                    setContent('')
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  )
}

export default CountyMap
