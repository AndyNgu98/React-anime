import React from 'react'

const News = ({newsarticle}) => {
  return (
    <>
      {
        newsarticle.map((news) => {
          return (
            <li>{news.author_name}</li>
          )
        })
      }
    </>
  )
}

export default News
