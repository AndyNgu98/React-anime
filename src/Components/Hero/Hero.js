import React from 'react'
import './Hero.css'
import hero from '../../Images/Hero.jpg'

const Hero = () => {
  return (
    <div className='hero-container'>
        <img className='hero-img' src={hero} alt='hero'/>
    </div>
  )
}

export default Hero
