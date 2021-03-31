import React, {useContext, useEffect} from 'react'
import Hero from '../Hero/Hero'
import {FavContext} from '../../Context/fav-context'
import Card from '../Card/Card'

const Favourites = ({history}) => {
  const {loadFavourites, favourites, deleteFavourite} = useContext(FavContext)

  useEffect(() => {
    loadFavourites()
  }, [])

  const selectShow = (id) => {
    history.push({pathname: `/anime-preview/${id}`})
  }

  const showFavourites = favourites.map((favourite, i) => {
    const found = favourites.find(favourite => favourite.mal_id === favourite.mal_id)
    const classes = found ? ["fas", "fa-star", "show-list__star--active"] : ["fas", "fa-star", "show-list__star"]

    let removeFavourite = (
      <>
        <span className="icon-text">
          <span className="icon">
            <i className={classes.join(' ')} onClick={() => deleteFavourite(favourite.key)}></i>
          </span>
          <p className='mt-3'>Remove From Favourites</p>
        </span>
      </>
    )

    return (
      <div className="column is-one-quarter" key={favourite.mal_id}>

        <Card 
        Cardshow={favourite}
        selectShow={selectShow}
        toggleFavourite={removeFavourite}
        />

      </div>
    )
  })

  return (
    <>
      <Hero title="Your Anime" subtitle="Build your collection" heroClass='hero__user'/>

      <section className="section ">
        <div className="container has-text-centered ">
          <h2 className='title show-list__title mb-6'>Your Favourite Anime</h2>
          <div className="columns is-multiline">
            { showFavourites }
          </div>
        </div>
      </section>
    </>
  )
}

export default Favourites
