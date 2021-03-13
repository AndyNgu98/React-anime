import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Hero from '../Hero/Hero'
import ShowList from '../ShowList/ShowList'

const Home = (props) => {
  const [Upcoming, setUpcoming] = useState([])
  const [Airing, setAiring] = useState([])

  useEffect(() => {
    fiveAiring()
    fiveUpcoming()
  },[])

  // Refactor duplicated code
  // up-and-coming & airing - GET from API & save to state.

  const fiveUpcoming = () => {
    axios.get('https://api.jikan.moe/v3/top/anime/1/upcoming')
    .then((response) => {
      const listUp = response.data.top.slice(0,4)
      setUpcoming(listUp)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const fiveAiring = () => {
    axios.get('https://api.jikan.moe/v3/top/anime/1/airing')
    .then(response => {
      const listAir = response.data.top.slice(0,4)
      setAiring(listAir)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <Hero title='Your Anime Collection' subtitle='Watch &amp; Read anytime, anywhere' heroClass='hero__home'/>
      
      {/* <ShowList shows={Upcoming} title='Upcoming Anime' selectShow={(id) => selectShow(id)}/> */}

      {/* <ShowList shows={Airing} title='Currently Showing' selectShow={(id) => selectShow(id)}/> */}
    </>
  )
}

export default Home
