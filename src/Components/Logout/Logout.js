import React, {useContext, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {AuthContext} from '../../Context/auth-context'

const Logout = (props) => {

  const {logout} = useContext(AuthContext)

  useEffect(() => {
    logout()
  }, [logout])


  return <Redirect to='/'/>
}

export default Logout
