import React, {useEffect, useState, useContext} from 'react'
import {AuthContext} from '../../Context/auth-context'
import axios from 'axios'
import ShowList from '../ShowList/ShowList'
import News from '../News/News'
// import Favourites from '../Favourites/Favourties'
// import ShowSearch from '../ShowSearch/ShowSearch'
// import Recommend from '../Recommended/Recommended'
import Hero from '../Hero/Hero'

const User = (props) => {
  
  const [favourites, setFavourites] = useState([])
  const {localId} = useContext(AuthContext)

  useEffect(() => {
    // getAllTime()
    // setDefaultrecommendations()
    loadFavourites()
  }, [])

  const loadFavourites = () => {
    axios.get(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/KLynfRRfDUSe2HUBY3OvmIYzLQc2/favourites/.json`)
    .then((res) => {
      // CREATING NEW ARRAY TO STORE THE OBJECTS THAT ARE NOT CURRENTLY INSIDE AN ARRAY
      const newFavarr = []
      for(let key in res.data) {
        
        // PASSING UNIQUE KEY FROM FIREBASE AND THE DATA OBJECT INSIDE THE ARRAY
        const { mal_id, title, image_url, sypnopsis, episodes, title_japanese } = res.data[key]
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

  

  // GET ALL TIME FAVOURITE
  // const getAllTime = () => {
  //   axios.get('https://api.jikan.moe/v3/top/anime/1/favorite')
  //   .then(response => {
  //     const popular = response.data.top.slice(0,4)
  //     setMostpopular(popular)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }


  // ------------ FAVOURITES FUNCTIONS ---------------- //

  
  

 

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
  // const updateRecommendations = () => {
  //   const results = []
  //     favourites.forEach((favourite) => {
  //     axios.get(`https://api.jikan.moe/v3/anime/${favourite.mal_id}/recommendations`)
  //       .then(res => {
  //         res.data.recommendations.slice(0,1).forEach(show => results.push(show))
  //       })
  //       .catch(err => console.log(err))
  //     })      
  //     if(recommended.length <=  2) {
  //     setRecommended(results)
  //     } else {
  //       const newArr = [...recommended.slice(1), results[0]]
  //     // setIngredients(prevState => [...prevState, newObj ])
  //     setRecommended(newArr)
  //     }
  // }

  // GETS DATA OBJECT ONCLICK AND TRANSFORMING IT INTO WHAT I WANT AND PASSING IT AS USER
  // const selectedId = (id) => {    
  //   axios.get(`https://api.jikan.moe/v3/anime/${id}`)
  //   .then(response => {
  //     const { mal_id, title, image_url, synopsis, episodes, title_japanese, score } = response.data
  //     const users = {
  //       title,
  //       title_japanese,
  //       synopsis,
  //       episodes,
  //       image_url,
  //       mal_id,
  //       score
  //     }
  //     // postFavourite(users)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }

  // USING THE KEY FROM FIREBASE THAT IS CLICKED TO DELETE THE OBJECT
  // const onDelete = (key) => {
  //   axios.delete(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/${localId}/favourites/${key}/.json`)    
  //   .then((response) => {
  //     // Deleted from database but still in state so updating state with everything that is not equal to the id that was selected
  //     const newFaveourites = favourites.filter(favourites => {
  //       return favourites.key !== key
  //     })
  //     setFavourites(newFaveourites)
  //     // setFavourites((prevState) => {
  //     //   return prevState.filter(favourites => {
  //     //     return favourites.key !== key
  //     //   })
  //     // })   
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }


  const addFavourites = (show) => {
    axios.post(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/KLynfRRfDUSe2HUBY3OvmIYzLQc2/favourites/.json`, show)
    .then((res) => {
      setFavourites(prevState => [...prevState, {
        ...show,
        key: res.data.name
      }])
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const deleteFavourite = (key) => {
    axios.delete(`https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/users/KLynfRRfDUSe2HUBY3OvmIYzLQc2/favourites/${key}/.json`)
    .then((res) => {
      console.log(res)
      const results = favourites.filter(favourite => favourite.key !== key)
      setFavourites(results)
      // console.log(results)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const toggleFavourite = (show, found) => {
    if(found) {
      deleteFavourite(found.key)
    } else {
      addFavourites(show)
    } 
  }
  
  console.log(favourites)

  return (
    <>
      <Hero title="Your Anime" subtitle="Build your collection" heroClass='hero__user'/>

      <ShowList 
        favourites={favourites} 
        title='Most Popular' 
        toggleFavourite={toggleFavourite}
      />

      <News/>
    </>
  )
}

export default User
