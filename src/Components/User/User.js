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
import Recommend from '../Recommended/Recommended'

const User = (props) => {
  
  const [mostPopular, setMostpopular] = useState([])
  const [search, setSearch] = useState('')
  const [fetchAnime, setFetchanime] = useState([])
  const [selected, setSelected] = useState([])
  const [news, setNews] = useState([])
  const [favourites, setFavourites] = useState([])
  const [recommended, setRecommended] = useState([])
  const {localId} = useContext(AuthContext)

  useEffect(() => {
    getAllTime()
    getNews()
    // setDefaultrecommendations()
    loadFavourites()
  }, [])

  useEffect(() => {
    updateRecommendations()
  },[favourites])

  // PREVENT REFRESH OF PAGE ON SUBMIT
  const handleSearch = (e) => {
    e.preventDefault();
    getAnime(search)
  }

  // RETRIEVE ANIME FROM SEARCH BAR
  const getAnime = (query) => {
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

  // RETRIEVE NEWS FROM API
  const getNews = () => {
    axios.get('https://api.jikan.moe/v3/anime/1/news')
    .then(res => {
      const articles = res.data.articles.slice(0,5)
      setNews(articles)
      console.log(articles)
    })
    .catch(error => console.log(error))
  }

  // GET ALL TIME FAVOURITE
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


  // ------------ FAVOURITES FUNCTIONS ---------------- //

  // LOAD FAVOURITES FROM FIREBASE
  const loadFavourites = () => {
    axios.get(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}/favourites/.json`)
    .then((response) => {
      // CREATING NEW ARRAY TO STORE THE OBJECTS THAT ARE NOT CURRENTLY INSIDE AN ARRAY
      const newFavarr = []
      for(let key in response.data) {
        // PASSING UNIQUE KEY FROM FIREBASE AND THE DATA OBJECT INSIDE THE ARRAY
        const { mal_id, title, image_url, sypnopsis, episodes, title_japanese } = response.data[key]
        newFavarr.push({
          mal_id,
          title,
          episodes,
          image_url,
          sypnopsis,
          title_japanese,
          // ADDED THE KEY OURSELVES
          key
        })
      }
      setFavourites(newFavarr)
    })
    .catch((error) => {
      console.log(error)
    })
  }

// POST FAVOURITE ANIME TO FIREBASE
  const postFavourite = (data) => {
    // CHECK IF ID === ID IN THE STATE
    // ONLY WANT TO ADD IF IT ISNT ALREADY ADDED

  // IF YOU HAVE IT THEN IT WILL RETURN 1 IF YOU DONT THEN IT WILL RETURN 0
    const result = favourites.filter((favourite) => {
      return favourite.mal_id === data.mal_id
    })
    // console.log(result.length)
    // console.log(result)
    if(result.length === 0) {
      axios.post(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}/favourites/.json`, data )
      // Success
      .then((response) => {
        // PASSED FUNCTION FROM USERS
        loadFavourites()
        console.log(localId)
      })
      .catch((error) => {
        console.log(error)
      })
    } else {
      // load modal
      alert('already exists')
    }
  } 

  // ADD 5 DEFAULT RECOMMENDED BASED OF TOP 5
  // const setDefaultrecommendations = () => {
  //   if(favourites.length === 0) {
  //     axios.get('https://api.jikan.moe/v3/anime/1/recommendations')
  //     .then((res) => {
  //       const defRec = res.data.recommendations.slice(0,10)
  //       setRecommended(defRec)
  //     })
  //     .catch(err => console.log(err))
  //   }
  // }

  // IF THE LEGNTH OF THE ARRAY IS LESS THAN OR EQUAL TO 6 IN THE FAVOURITES THEN PUSH A RECOMMENDED ANIME INTO THE ARRAY ELSE 
  const updateRecommendations = () => {
    // if(recommended.length <= 6) {
      const results = []
      favourites.forEach((favourite) => {
      axios.get(`https://api.jikan.moe/v3/anime/${favourite.mal_id}/recommendations`)
        .then(res => {
          res.data.recommendations.slice(0,1).forEach(show => results.push(show))
          // console.log(data)
          // results.push(data)
        })
        .catch(err => console.log(err))
      })      
      setRecommended(results)
    // } else {
    //   recommended.splice(0,1)
    //   // alert('we have removed your first one puta')
    // }
  
  }

  // GETS DATA OBJECT ONCLICK AND TRANSFORMING IT INTO WHAT I WANT AND PASSING IT AS USER
  const selectedId = (id) => {    
    axios.get(`https://api.jikan.moe/v3/anime/${id}`)
    .then(response => {
      const { mal_id, title, image_url, synopsis, episodes, title_japanese, score } = response.data
      const users = {
        title,
        title_japanese,
        synopsis,
        episodes,
        image_url,
        mal_id,
        score
      }
      postFavourite(users)
      // getSelectedrecommended(id)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // USING THE KEY FROM FIREBASE THAT IS CLICKED TO DELETE THE OBJECT
  const onDelete = (key) => {
    axios.delete(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}/favourites/${key}/.json`)    
    .then((response) => {
      // Deleted from database but still in state so updating state with everything that is not equal to the id that was selected
      const newFaveourites = favourites.filter(favourites => {
        return favourites.key !== key
      })
      setFavourites(newFaveourites)
      
      // setFavourites((prevState) => {
      //   return prevState.filter(favourites => {
      //     return favourites.key !== key
      //   })
      // })   
    })
    .catch((error) => {
      console.log(error)
    })
  }

    // ------------ FAVOURITES FUNCTIONS END HERE ---------------- //

    // SENDS US TO THE ENDPOINT
  const selectShow = (id) => {
    props.history.push({pathname: `/anime-preview/${id}`})
  }

  return (
    <>
    {/* SHOWLIST */}
      <div>
        <ShowList shows={mostPopular} title='Most Popular' selectShow={(id) => selectShow(id)}/>
      </div>
      {/* TABNAV */}
      <div>
      <TabNav tabs={[ 'News', 'Search', 'Favourites', 'Recommendation']} selected={ selected } setSelected={ setSelected }>

        {/* NEWS TAB */}
        <Tab isSelected={ selected === 'News' }>
          <News newsarticle={news}/>
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
        <ShowSearch fetchanime={fetchAnime} selectedId={selectedId} selectShow={(id) => selectShow(id)}/>
        </div>
        </Tab>

        {/* FAVOURITES TAB */}
        <Tab isSelected={ selected === 'Favourites' }>
          <Favourites favourites={favourites} onDelete={onDelete}/>
        </Tab>

        {/* RECOMMENDED TAB */}
        <Tab isSelected={ selected === 'Recommendation' }>
          <Recommend recommendations={recommended}/>
        </Tab>
      </TabNav>
      </div>

    </>
  )
}

export default User
