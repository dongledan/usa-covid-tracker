import React from 'react'
import mask from '../images/mask.png'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="gif">
        <img
          className="footer-img gif"
          src={mask}
          alt={'Illustration of a surgical mask. Please wear a mask!'}
        />
        <span className="gif-pop cough" />
      </div>
      <div className="footer-text">
        Please wear a{' '}
        <a
          href="https://www.ucsf.edu/news/2020/06/417906/still-confused-about-masks-heres-science-behind-how-face-masks-prevent"
          rel="noreferrer"
          target="_blank"
        >
          mask
        </a>
        .
        <div className="caption">
          Made by{' '}
          <a href={'https://dannyboy.dev/'} rel="noreferrer" target="_blank">
            Danny
          </a>{' '}
          in the big{' '}
          <a
            style={{textDecoration: 'none', fontSize: '17px'}}
            href={'https://en.wikipedia.org/wiki/Apple'}
            rel="noreferrer"
            target="_blank"
          >
            🍎
          </a>
          .
        </div>
      </div>
    </div>
  )
}
