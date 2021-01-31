import React from 'react'

const Search = (props) => {
  return (
    <section className='container'>
      <div>
        <form className='search-input' onSubmit={props.handleSearch}>
          <input className='search-input' placeholder='Search for Anime' type='search' value={props.search} onChange={e => props.SetSearch(e.target.value)}/>
        </form>
      </div>
    </section>
  )
}

export default Search
