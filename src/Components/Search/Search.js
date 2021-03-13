import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'

import { useLocation } from 'react-router-dom'

const Search = ({history}) => {

  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [searchDisplay, setDisplay] = useState('')

  // const useQuery = () => new URLSearchParams(useLocation().search)
  // let searchParam = useQuery().get('s')
  // history.location.search.split('=')[1]
  // console.log(searchParam)



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
  
  let searchDisplayMessage = <p className="subtitle search__subtitle">SEARCH:</p>
  if (searchDisplay) {
    searchDisplayMessage = (
      <>
        <p className="subtitle search__subtitle">SEARCH RESULTS:</p>
        <p className="title search__title">{searchDisplay}</p>
      </>
    )
  }

  const selectShow = (id) => {
    history.push({pathname: `/anime-preview/${id}`})
  }

  let searchShow = <Spinner/>
  
  if(!loading) {
    console.log(result)
    searchShow = result.map((show, i) => (
      <div className='columns' key={i}>
        {
          show.map((anime) =>(
            <div className="column" key={anime.mal_id}>
              <div className="card show-list__card">
                <div className="card-image">
                  <figure className="image is-4by4">
                    <img src={anime.image_url} alt={anime.title}/>
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
                    <p><strong>{anime.title}</strong></p>
                    <p><i>{anime.start_date ? `Release: ${new Date(anime.start_date).toDateString()}` : '' }</i></p> 
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    ))
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
