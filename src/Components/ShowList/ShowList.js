import React from 'react'

const ShowList = (props) => {  
    return (
      <>
        <h2 className='title'>{props.title}</h2>
        <ul className='shows__container'>
          {
            props.shows.map((show) => (
              <li onClick={() => props.selectShow(show.mal_id)} className='shows__list-item' key={show.mal_id} >
              <img src={show.image_url} alt=''/>
              </li>
            ))
          }
        </ul>
      </> 
    )
  }

export default ShowList
