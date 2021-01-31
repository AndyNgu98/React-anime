import React, {useContext} from 'react'
import {AuthContext} from '../../Context/auth-context'

const ShowList = ({shows, title}) => {

  const {itemModalhandler} = useContext(AuthContext)

  const upComingShowsList = shows.map((show) => (
    <li onClick={() => itemModalhandler(show)} className='shows__list-item' key={show.mal_id} >
      <img src={show.image_url} alt=''/>
    </li>
  ))

  return (
    <>
      <h2 className='title'>{title}</h2>
      <ul className='shows__container'>
        {upComingShowsList}
      </ul>
    </> 
  )
}

export default ShowList
