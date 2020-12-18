import React from 'react'

export default function News(props) {
  const {news} = props
  const sortedNews = news.__sorted ? news.__sorted.slice(0, 5) : []
  return (
    <div className="news-container">
      <div className="headline">Latest COVID-19 News</div>
      {sortedNews.map((recent) => (
        <div key={recent}>
          <div className="link">
            <a href={news[recent].link} target="_blank">
              {news[recent].title}
            </a>
            <div className="caption">
              {news[recent].source}
              <span className="bullet">•</span>
              {news[recent].pubDate}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
