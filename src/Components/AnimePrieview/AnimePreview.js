import React, {useEffect, useState} from 'react';
import axios from 'axios'

const AnimePreview = (props) => {

  const [anime, setAnime] = useState([])
  const [characters, setCharacter] = useState([])

  useEffect(() => {
    getAnime()
  },[])

  const getAnime = () => {
    axios.get(`https://api.jikan.moe/v3/anime/${props.match.params.id}`)
    .then(res => {
      setAnime(res.data)
      getCharacter()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const getCharacter = () => {
    axios.get(`https://api.jikan.moe/v3/anime/${props.match.params.id}/characters_staff`)
    .then(res => {
      setCharacter(res.data.characters.slice(0,5))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <div className='anime-preview__main-container'>
        <h2 className='anime-preview__title has-text-centered'>{anime.title}</h2>

          <div className='anime-preview__anime-container'>
            <img src={anime.image_url} alt=''/>
          </div>

          <div className='anime-preview__synopsis'>
            <p>{anime.synopsis}</p>
          </div>

          <div className='anime-preview__trailer'>
          <h2 className='anime-preview__title has-text-centered'>Trailer</h2>
            <iframe title="Anime Trailer" width="420" height="315" src={anime.trailer_url}></iframe>
          </div>

        <h2 className='anime-preview__title has-text-centered'>Characters</h2>
        <div className='anime-preview__character-container'>
          {
            characters.map((character) => (
              <ul key={character.mal_id} >
                  <img src={character.image_url} alt=''/>
                  <li>{character.name}</li>
              </ul>
            ))
          }
        </div>
      </div>  
    </>
  )
}

            

export default AnimePreview
