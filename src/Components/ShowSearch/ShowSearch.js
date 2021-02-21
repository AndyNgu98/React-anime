import React from 'react'

const ShowSearch = (props) => {

  return (
    <div className='search__container'>
      {
        props.fetchanime.map((anime) => (
          <ul className='search__item' key={anime.mal_id}>
            <li>
              <img src={anime.image_url} alt='search__image' onClick={() => props.selectShow(anime.mal_id)}/>
            </li>
            <button className='search__btn ' onClick={() => props.selectedId(anime.mal_id)}>Add to favorite</button> 
          </ul> 
        ))
      }
    </div>
  )
}

export default ShowSearch