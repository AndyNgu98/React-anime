import axios from 'axios'
import React, {useContext, useState} from 'react'
import {AuthContext} from '../Context/auth-context'

const AnimeCard = ({anime}) => {

  const {localId, itemModalhandler} = useContext(AuthContext)
  const [favourites, setFavourites] = useState([])


  // const query = search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`
  // https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/.json?orderBy="localId"&equalTo="${localId}"
  // useEffect(() => {
  // })
  const postFavourite = (data) => {
    
      // axios.post(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/${localId}.json`, data )
      axios.post(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/.json`, data )
            
      // Success
      .then((response) => {
        console.log(response)
        // setFavourites(data)
      })
      .catch((error) => {
        console.log(error)
      })
  } 

  const selectedId = (id) => {
    // console.log(id)
    
    // can we store data more efficiently
    axios.get(`https://api.jikan.moe/v3/anime/${id}`)
    .then(response => {
      const chosenAnime = response.data
      const users = {
        localId: localId,
        favourites: chosenAnime
      }
      postFavourite(users)

    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <article className='anime-search'>
    <li onClick={() => itemModalhandler(anime)} className='item-search'>
      <figure>
        <img src={anime.image_url} alt='search'/>
      </figure>
      <button onClick={() => selectedId(anime.mal_id)}>Add to favorite</button>
    </li>
  </article>       
  )
}

export default AnimeCard