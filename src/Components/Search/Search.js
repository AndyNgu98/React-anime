import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import {AuthContext} from '../../Context/auth-context'
import {FavContext} from '../../Context/fav-context'
import Card from '../Card/Card'

const Search = ({history}) => {

  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [searchDisplay, setDisplay] = useState('')

  const {localId, idToken} = useContext(AuthContext)
  const {loadFavourites, favourites, toggleFavourite} = useContext(FavContext)

  useEffect(() => {
    loadFavourites(localId)
  }, [])

  useEffect(() => {
    if(history.location.state) {
      getAnime(history.location.state.search)
      setDisplay(history.location.state.search)
      history.replace({ pathname: history.location.pathname, state: null })
    }
  },[])

  const chunkArray = (array, size) => {
    let result = []
    for (let i = 0; i < array.length; i += size) {
        let chunk = array.slice(i, i + size)
        result.push(chunk)
    }
    return result
  }

  const submitHandler = (e) => {
    if(e.charCode === 13 && search) {
      getAnime(search)
      setDisplay(search)
      setSearch('')
    }
  }

  // RETRIEVE ANIME FROM SEARCH BAR
  const getAnime = (query) => {
    setLoading(true)
    axios.get(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=16`)
    .then(response => {
      setLoading(false)
      setResult(chunkArray(response.data.results, 4)) 
    })
    .catch((error) => {
      setLoading(false)
      console.log(error)
    })
  }

  const selectShow = (id) => {
    history.push({pathname: `/anime-preview/${id}`})
  }
  
  let searchDisplayMessage = <p className="subtitle search__subtitle">SEARCH:</p>
  if (searchDisplay) {
    searchDisplayMessage = (
      <>
        <p className="subtitle search__subtitle">SEARCH RESULTS:</p>
        <p className="title search__title">{searchDisplay}</p>
      </>
    )
  }

  let searchShow = <Spinner/>
  
  // IF NOT BUFFERING SHOW SHOWLIST
  if(!loading) {
    // MAP THROUGH FIRST ARRAY
    searchShow = result.map((show, i) => {
      // RETURN ARRAY INTO 4 ROWS OF COLUMNS
      return (
        <div className='columns' key={i}>
          {
            // SECOND MAP TO GET SINGLE SHOW
            show.map((anime) => {
              // CHANGED SHOW.MAL_ID TO ANIME.MAL_ID
              const found = favourites.find(favourite => favourite.mal_id === anime.mal_id)
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
                        {/* PASSED ON ANIME INTO SHOW */}
                        <i className={classes.join(' ')} onClick={() => toggleFavourite(anime, found)}></i>
                      </span>
                      <p className='mt-3'>Add to Favorites</p>
                    </span>
                  </>
                )
              }
              
            return (
              <div className="column" key={anime.mal_id}>

                <Card
                Cardshow={anime}
                selectShow={selectShow}
                toggleFavourite={addFavourite}
                />                

              </div>
              )
            })
          }
        </div>
      ) 
    })
  }
    
  return (
    <>
      <div className='hero is-medium search'> 
        <div className='hero-body hero__overlay'>
          <div className='container search__container has-text-centered'>
            {searchDisplayMessage}
            <input className='input search__input' placeholder='Search for Anime' value={search} onChange={e => setSearch(e.target.value)} onKeyPress={(e) => submitHandler(e)}/>

          </div>
        </div>
      </div>
      
      <div className='section'>
        <div className='container'>
            {searchShow}
        </div>      
      </div>
    </>
  )
}

export default Search
