import React from 'react'

const Recommended = ({recommendations}) => {
  console.log(recommendations)
  return (
    <>
      <div className='recommended__container'>
        {
          recommendations.map((recommend) => (
            <ul className='recommended__list-items' key={recommend.mal_id}>
              <li>
                <img src={recommend.image_url} alt=''/>
              </li>
            </ul>
          ))
        }
      </div>
    </>
  )
}

export default Recommended
