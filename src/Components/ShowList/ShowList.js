import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {AuthContext} from '../../Context/auth-context'
import {FavContext} from '../../Context/fav-context'
import Card from '../Card/Card'

const ShowList = ({ favourites, title, history, endPoint, total}) => {  

  const [shows, setShows] = useState([])
  const {idToken} = useContext(AuthContext)
  const {toggleFavourite} = useContext(FavContext)

  useEffect(() => {    
    getPopularShows()
  },[])

  const getPopularShows = () => { 
    axios.get(endPoint)
    .then(res => {
      const data = res.data.top.slice(0,total)
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

    let addFavourite = (
      <>
      </>
    )

    if(idToken !=null) {
      addFavourite = (
        <>
          <span className="icon-text">
            <span className="icon">
              <i className={classes.join(' ')} onClick={() => toggleFavourite(show, found)}></i>
            </span>
            <p className='mt-3'>Add to Favorites</p>
          </span>
        </>
      )
    }
  
    return (
      <div className="column" key={show.mal_id}>

        <Card 
        Cardshow={show}
        selectShow={selectShow}
        toggleFavourite={addFavourite}/>

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


