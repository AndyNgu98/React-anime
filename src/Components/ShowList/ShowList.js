import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {withRouter } from 'react-router-dom'
import {AuthContext} from '../../Context/auth-context'

const ShowList = ({ favourites, title, history, toggleFavourite, endPoint }) => {  

  const [shows, setShows] = useState([])
  
  useEffect(() => {    
    getPopularShows()
    console.log(favourites)
  },[])



  const getPopularShows = () => { 
    axios.get('https://api.jikan.moe/v3/top/anime/1/favorite')
    .then(res => {
      const data = res.data.top.slice(0,4)
      setShows(data)
    })
    .catch(err => {
      console.log(err)
    })  
  }


  // SENDS US TO THE ENDPOINT
  const selectShow = (id) => {
    history.push({pathname: `/anime-preview/${id}`})
  }

  const renderedShows = shows.map((show, i) => {
    const found = favourites.find(favourite => favourite.mal_id === show.mal_id)
    const classes = found ? ["fas", "fa-star", "show-list__star--active"] : ["fas", "fa-star", "show-list__star"]
  
    return (
      <div className="column" key={show.mal_id}>
        <div className="card show-list__card">
          <div className="card-image">
            <figure className="image is-4by4">
              <img src={show.image_url} alt={show.title}/>
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              <div>
                <p className='show-list__title' onClick={() => selectShow(show.mal_id)}>{show.title}</p>
                <p><i>{ show.start_date ? `Release: ${show.start_date}` : '' }</i></p>
              </div>
              <div className='mt-4'>
                <span className="icon-text">
                  <span className="icon">
                    <i className={classes.join(' ')} onClick={() => toggleFavourite(show, found)}></i>
                  </span>
                  <p className='mt-3'>Add to Favorites</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <section className="section">
      <div className="container has-text-centered">
        <h2 className='title show-list__title mb-6'>{title}</h2>
        <div className="columns">
          { renderedShows }
        </div>
      </div>
    </section>
  )
}

export default withRouter(ShowList)


