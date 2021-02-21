import React from 'react'

const News = ({newsarticle}) => {
  return (
    <>
      <div className='news-container'>
        {
          newsarticle.map((news) => (
            <div className="card" >
              <div className="card-image">
                <figure>
                  <img src={news.image_url} alt=''/>   
                </figure>
              </div>
              <div className="card-content" >
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{news.title}</p>
                    <p className="subtitle is-6">{news.author_name}</p>
                  </div>
                </div>
                <div className="content">
                  {news.intro} 
                </div>
              </div>
            </div> 
          ))
        }
      </div>
    </>
  )
}

export default News




