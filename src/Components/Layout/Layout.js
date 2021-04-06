import React, {useContext, useState, useEffect} from 'react'
import {NavLink, withRouter } from 'react-router-dom'
import {AuthContext} from '../../Context/auth-context'
import Footer from '../Footer/Footer'

const Layout = ({children, history}) => {

  const {idToken} = useContext(AuthContext)
  const activeStyle = { fontWeight: 'bold' }
  const [search, setSearch] = useState('')
  const [isActive, setisActive] = useState(false);


  let navItems = (
    <>
      <li className='navbar-item'>
        <NavLink to="/" exact activeStyle={activeStyle}>Home</NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink to="/login" exact activeStyle={activeStyle}>Login</NavLink>
      </li>
    </>
  )

  if(idToken != null) {
    navItems = (
      <>
        <li className='navbar-item'> 
          <NavLink to="/favourites" exact activeStyle={activeStyle}>Favourites</NavLink>
        </li>
        <li className='navbar-item'> 
          <NavLink to="/user" exact activeStyle={activeStyle}>User</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to="/" exact activeStyle={activeStyle}>Home</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to="/logout" exact activeStyle={activeStyle}>Logout</NavLink>
        </li>
      </>
    )
  }

  const submitHandler = (e) => {
    if(e.charCode === 13 && search) {
      history.push({
        pathname: '/search',
        // search: `?s=${search}`,
        state: {search: search}
      })
      setSearch('')
    }
  }

  let searchBar = null
  if(history.location.pathname !=='/search') {
    searchBar = (
      <div className='navbar-end'>
        <div className='navbar-item field'>
          <p className="control has-icons-right">
           <input className='input' placeholder='Search for Anime' value={search} onChange={e => setSearch(e.target.value)} onKeyPress={(e) => submitHandler(e)}/>
          </p>
        </div>
      </div>
    )
  }

  return (
  <> 
    
    <nav className="navbar has-shadow is-fixed-top">
      <div className="container">
        <div className="navbar-brand">
        <li onClick={() => {setisActive(!isActive);}}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </li>

        </div>
        <div className="navbar-menu" id="navbar-menu" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            { navItems }
          </div>
          
          {searchBar}
          
        </div>
      </div>
      
    </nav>
    
    <main>
      {children}
    </main>
    
    <Footer/>
    
  </>
  )
}

export default withRouter(Layout) 

