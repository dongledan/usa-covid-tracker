import React from 'react'
import mask from '../images/mask.png'

export default function Footer() {
  return (
    <div className="footer-container">
      <a href={'https://dannyboy.dev/'} rel="noreferrer" target="_blank">
        <img
          className="footer-img"
          src={mask}
          alt={'Illustration of a surgical mask. Please wear a mask!'}
        />
      </a>
      <div className="footer-text">
        Please wear a <span className="blue">mask</span>.
      </div>
    </div>
  )
}
