import React, {createContext, useState, useContext} from 'react';
import axios from 'axios'
import {AuthContext} from './auth-context'

export const FavContext = createContext({})


const FavouriteContextProvider = (props) => {

  const [favourites, setFavourites] = useState([])
  const {localId} = useContext(AuthContext)

  const loadFavourites = () => {
    axios.get(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}/favourites/.json`)
    .then((res) => {
      // CREATING NEW ARRAY TO STORE THE OBJECTS THAT ARE NOT CURRENTLY INSIDE AN ARRAY
      const newFavarr = []
      for(let key in res.data) {
        // PASSING UNIQUE KEY FROM FIREBASE AND THE DATA OBJECT INSIDE THE ARRAY
        const { mal_id, title, image_url, sypnopsis, episodes, title_japanese } = res.data[key]
        newFavarr.push({
          mal_id,
          title,
          episodes,
          image_url,
          sypnopsis,
          title_japanese,
          // ADDED THE KEY OURSELVES
          key
        })
      }
      setFavourites(newFavarr)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const addFavourite = (show) => {
    axios.post(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}/favourites/.json`, show)
    .then((res) => {
      setFavourites(prevState => [...prevState, {
        ...show,
        key: res.data.name
      }])
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const deleteFavourite = (key) => {
    axios.delete(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}/favourites/${key}/.json`)
    .then((res) => {
      const results = favourites.filter(favourite => favourite.key !== key)
      setFavourites(results)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const toggleFavourite = (show, found) => {
    if(found) {
      deleteFavourite(found.key)
    } else {
      addFavourite(show)
    } 
  }

  

  const state = {
    loadFavourites,
    favourites,
    toggleFavourite,
    deleteFavourite,
  }

  return (
    <FavContext.Provider value={state}>
      {props.children}
    </FavContext.Provider>
  )
}

export default FavouriteContextProvider
