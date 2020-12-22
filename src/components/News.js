import React from 'react'
import {resources} from './resources'

export default function News(props) {
  return (
    <div className="news-container">
      <div className="headline">Resources</div>
      {resources.map((resource, i) => (
        <div key={i}>
          <div className="link">
            -{' '}
            <a href={resource.link} rel="noreferrer" target="_blank">
              {resource.title}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
