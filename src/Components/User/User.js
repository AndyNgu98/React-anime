import React, {useEffect, useState, useContext} from 'react'
import {AuthContext} from '../../Context/auth-context'
import axios from 'axios'
import ShowList from '../ShowList/ShowList'
import TabNav from '../TabNav/TabNav'
import Tab from '../Tab/Tab'
import News from '../News/News'
import Favourites from '../Favourites/Favourties'
import Search from '../Search/Search'
import ShowSearch from '../ShowSearch/ShowSearch'

const User = (props) => {
  
  const {localId} = useContext(AuthContext)
  const [mostPopular, setMostpopular] = useState([])
  const [search, setSearch] = useState('')
  const [fetchAnime, setFetchanime] = useState([])
  const [selected, setSelected] = useState([])
  const [news, setNews] = useState([])

  useEffect(() => {
    getAllTime()
    getNews()
    getFavourite()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(search)
    getAnime(search)
  }

  const getAnime = (query, id) => {
    fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10/.json`)
    .then(response => response.json())
    .then(response => {
      const searchAnime = response.results
      setFetchanime(searchAnime)    
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getNews = () => {
    axios.get('https://api.jikan.moe/v3/anime/1/news')
    .then(res => {
      const articles = res.data.articles.slice(0,5)
      // setNews(articles)
      console.log(articles)
    })
    .catch(error => console.log(error))
  }

  const getFavourite = () => {
    axios.get(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/${localId}/.json`)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getAllTime = () => {
    axios.get('https://api.jikan.moe/v3/top/anime/1/favorite')
    .then(response => {
      const popular = response.data.top.slice(0,5)
      setMostpopular(popular)

    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <>
      <div>
        <ShowList shows={mostPopular} title='Most Popular'/>
      </div>
      <div>
      <TabNav tabs={[ 'News', 'Search', 'Favourites', 'Recommendation']} selected={ selected } setSelected={ setSelected }>

        {/* NEWS TAB */}
        <Tab isSelected={ selected === 'News' }>
          {/* <News newsarticle={news}/> */}
        </Tab>
        
        {/* SEARCH TAB */}
        <Tab isSelected={ selected === 'Search' }>
        <div>
          <Search
          handleSearch={handleSearch}
          search={search}
          SetSearch={setSearch}
          fetchanime={fetchAnime}/>
        </div>
        <div>
        <ShowSearch fetchanime={fetchAnime}/>
        </div>
        </Tab>

        {/* FAVOURITES TAB */}
        <Tab isSelected={ selected === 'Favourites' }>
          <Favourites/>
        </Tab>
      </TabNav>
      </div>

    </>
  )
}

export default User
