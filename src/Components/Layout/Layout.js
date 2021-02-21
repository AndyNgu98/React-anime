import React, {useContext} from 'react'
import {NavLink } from 'react-router-dom'
import {AuthContext} from '../../Context/auth-context'

const Layout = ({children}) => {

  const {idToken} = useContext(AuthContext)

  let navItems = (
    <>
      <li className='navbar-item'>
        <NavLink to="/" exact>Home</NavLink>
      </li>
      <li className='navbar-item'>
        <NavLink to="/login" exact>Login</NavLink>
      </li>
    </>
  )

  if(idToken != null) {
    navItems = (
      <>
        <li className='navbar-item'> 
          <NavLink to="/user" exact>User</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to="/" exact>Home</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to="/logout" exact>Logout</NavLink>
        </li>
      </>
    )
  }

  return (
  <> 
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div id='navbarBasicExample' className='navbar-menu'>
      <div className='navbar-end'>
        <div className='navbar-item'>
          {navItems}
        </div>
      </div>
      </div>
    </nav>
    
    <main>
      {children}
    </main>
    

    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Created by </strong> <a href="https://jgthms.com">Andy Nguyen</a>.
        </p>
      </div>
    </footer>
  </>
  )
}

export default Layout

