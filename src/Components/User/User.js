import React, {useEffect, useContext} from 'react'
import {FavContext} from '../../Context/fav-context'
import ShowList from '../ShowList/ShowList'
import News from '../News/News'
import Hero from '../Hero/Hero'

const User = () => {
  
  const {loadFavourites, favourites, toggleFavourite} = useContext(FavContext)

  useEffect(() => {
    loadFavourites()
  }, [])
  
  return (
    <>
      <Hero title="Your Anime" subtitle="Build your collection" heroClass='hero__user'/>

      <ShowList 
        endPoint={`https://api.jikan.moe/v3/top/anime/1/favorite`}
        favourites={favourites} 
        title='Most Popular' 
        total={4}
        toggleFavourite={toggleFavourite}
      />

      <News/>
    </>
  )
}

export default User
