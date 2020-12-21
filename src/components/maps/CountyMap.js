import React, {useState} from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'
import STATE_CENTERS from '../utils/us_state_centers'
import {getKeyByValue, color} from '../utils'
import {mapStates} from '../utils/states'

const CountyMap = (props) => {
  const {value, topDaily} = props
  console.log(topDaily)
  const stateId = getKeyByValue(mapStates, value)
  const state = STATE_CENTERS[stateId]
  const counties = require(`./data/${stateId}.json`)
  const [content, setContent] = useState('')

  return (
    <div className="county-map-container">
      <ComposableMap
        projection={state.StateCode === 'AK' ? 'geoAlbers' : 'geoMercator'}
        projectionConfig={{
          rotate: state.rotate ? state.rotate : null,
          scale: state.scale ? state.scale : 4000,
        }}
        data-tip=""
      >
        <ZoomableGroup
          center={[state.Longitude, state.Latitude]}
          maxZoom={3}
          disablePanning={true}
        >
          <Geographies geography={counties}>
            {({geographies}) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke={'#eca9a7'}
                    fill={
                      topDaily[geo.properties.NAME.toLowerCase()]
                        ? color(
                            topDaily[geo.properties.NAME.toLowerCase()]
                              .dailyRate
                          )
                        : '#ddd'
                    }
                    style={{
                      cursor: 'default',
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
                      setContent(NAME)
                    }}
                    onMouseLeave={() => {
                      setContent('')
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  )
}

export default CountyMap
