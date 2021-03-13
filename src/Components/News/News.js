import React, {useState, useEffect} from 'react'
import axios from 'axios'

const News = () => {

  const [news, setNews] = useState([])

  useEffect(() => {
    getNews()
  }, [])

  const chunkArray = (array, size) => {
    let result = []
    for (let i = 0; i < array.length; i += size) {
        let chunk = array.slice(i, i + size)
        result.push(chunk)
    }
    return result
  }

  const getNews = () => {
    axios.get('https://api.jikan.moe/v3/anime/1/news')
    .then(res => {
      setNews(chunkArray(res.data.articles.slice(0,6), 2))
    })
    .catch(error => console.log(error))
  }

  let renderedNews = news.map((letter) => (
    letter.map((read, i) => (
      <div className='columns' key={i}>
        <div className='column'>
          <div className="card mb-4" >
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src={read.image_url} alt=''/>   
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{read.title}</p>
                  <p className="subtitle is-6">{`Author: ${read.author_name}` }</p>
                </div>
              </div>
              <div className="content">
                <p>{read.intro} <a target="_blank" rel="noreferrer" href={read.url}>Read more</a></p>
                <p>{`Published: ${new Date(read.date).toDateString()}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  ))

  return (
    <section className='section news'>
      <div className='container'>
      <h1 className="title">News</h1>
        {renderedNews}
      </div>
    </section>
  )
}

export default News




