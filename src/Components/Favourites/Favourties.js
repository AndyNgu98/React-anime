import React from 'react'

const Favourites = ({favourites, onDelete}) => {
  return (
    <div>
      {
        favourites.map((favourite) => (
          <ul className='favourites__list-item' key={favourite.key}>
            <li>
              <img src={favourite.image_url} alt=''/>
            </li>
            <button className='favourites__btn-remove is-centered' onClick={() => onDelete(favourite.key)}>delete here</button>
          </ul>
        ))
      }
    </div>
  )
}

export default Favourites
