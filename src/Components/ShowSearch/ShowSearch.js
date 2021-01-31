import React from 'react'
import AnimeCard from '../../UI/AnimeCard'

 const ShowAnime = (props) => {
  return (
    <div>
      <h2>Your Search</h2>
      {props.fetchanime.map((anime) => (
            <AnimeCard
            anime={anime}
            key={anime.mal_id}/>   
      ))}
    </div>
      )
}

export default ShowAnime