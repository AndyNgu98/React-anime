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
      setCharacter(res.data.characters.slice(0,6))
    })
    .catch((err) => {
      console.log(err)
    })
  }


  let trailer = null

  if(anime.trailer_url) {
    trailer = <iframe title="Anime Trailer" width="100%" height="600px" src={anime.trailer_url}></iframe>

  }

  return (
    <>
      {trailer}
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            <div className='column is-one-quarter'>
              <img className='preview__img' src={anime.image_url} alt={anime.title}/>
            </div>
            <div className='column'>
              <h1 className='title mb-6'><a className='preview__link' target="_blank" rel="noreferrer" href={anime.url}>{anime.title}</a></h1>
              <p className='subtitle'>{anime.synopsis}</p>
              <p className='subtitle'>
                { anime.score ? `Scored: ${anime.score}` : null }
                <br />
                {anime.rating ? `Rating: ${anime.rating}` : null}  
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='section preview'>
        <div className='container'>
          <div className='columns'>
          {
            characters.map((character) => (
              <div className='column preview__character-img' key={character.mal_id}>
                <img className='mb-3' src={character.image_url} alt={character.name}/>
                <p><a className='preview__link' href={character.url} rel="noreferrer">{character.name}</a></p>
              </div>
            ))
          }
          </div>
        </div>
      </section>  
    </>
  )
}

            

export default AnimePreview
