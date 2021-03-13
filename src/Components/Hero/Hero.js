import React from 'react'

const Hero = ({title, subtitle, heroClass}) => {

  const classes = ['hero', 'is-large', heroClass ]

  return (
    <section className={classes.join(' ')}>
      <div className="hero-body hero__overlay">
        <div className="container has-text-centered">
          <p className="title hero__title">{title}</p>
          <p className="subtitle hero__subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
