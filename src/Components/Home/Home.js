import React, {useState, useEffect} from 'react'
import './Home.css'
import axios from 'axios'
import Hero from '../Hero/Hero'
import ShowList from '../ShowList/ShowList'

const Home = () => {
  const [Upcoming, setUpcoming] = useState([])
  const [Airing, setAiring] = useState([])


  useEffect(() => {
    fiveAiring()
    fiveUpcoming()
  },[])

  // Refactor duplicated code
  // up-and-coming & airing - GET from API & save to state. 
  
  const fiveUpcoming = () => {
    axios.get('https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/-MS0ZI07Hx7NHQteQqfH/.json')
    // axios.get('https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/up-and-coming/.json')
    .then((response) => {
      setUpcoming(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const fiveAiring = () => {
    axios.get('https://anime-project-7d79f-default-rtdb.europe-west1.firebasedatabase.app/-MS0d-WhtIlfZ4-QLSkl/.json')
    .then(response => {
      setAiring(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <Hero/>
      
      <ShowList shows={Upcoming} title='Upcoming'/>

      <ShowList shows={Airing} title='Airing'/>

    </>
  )
}

export default Home
