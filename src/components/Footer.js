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
        Please wear a{' '}
        <a
          href="https://www.ucsf.edu/news/2020/06/417906/still-confused-about-masks-heres-science-behind-how-face-masks-prevent"
          rel="noreferrer"
          target="_blank"
        >
          mask
        </a>
        .
      </div>
    </div>
  )
}
