import React, {useContext, useEffect} from 'react'
import Hero from '../Hero/Hero'
import ShowList from '../ShowList/ShowList'
import {FavContext} from '../../Context/fav-context'

const Home = () => {

  useEffect(() => {
    loadFavourites()
  }, [])

  const {loadFavourites, favourites, toggleFavourite} = useContext(FavContext)
  
  return (
    <>
      <Hero title='Your Anime Collection' subtitle='Watch &amp; Read anytime, anywhere' heroClass='hero__home'/>
      
      <ShowList 
      endPoint={`https://api.jikan.moe/v3/top/anime/1/upcoming`} 
      title='Upcoming Anime'
      favourites={favourites} 
      total={4}
      toggleFavourite={toggleFavourite}
      />

      <ShowList 
      endPoint={`https://api.jikan.moe/v3/top/anime/1/airing`} 
      title='Currently Showing'
      favourites={favourites} 
      total={4}
      toggleFavourite={toggleFavourite}
      />
    </>
  )
}

export default Home
