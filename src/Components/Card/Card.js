import React from 'react'

const Card = ({Cardshow, selectShow, toggleFavourite}) => {
  return (
    <div className="card show-list__card">
      <div className="card-image">
        <figure className="image is-4by4">
          <img src={Cardshow.image_url} alt={Cardshow.title}/>
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <div>
            <p className='show-list__title' onClick={() => selectShow(Cardshow.mal_id)}>{Cardshow.title}</p>
            <p><i>{Cardshow.start_date ? `Release: ${new Date(Cardshow.start_date).toDateString()}` : '' }</i></p> 
          </div>
          <div className='mt-4'>
            {toggleFavourite}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
