import React, {createContext, useState} from 'react';
import axios from 'axios'

export const AuthContext = createContext({})

const AuthContextProvider = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [idToken, setToken] = useState(null)
  const [localId, setLocalid] = useState(null)

  // Two functions that depending on what they want to do will pass this string into the method query.
  const login = () => authRequest('signInWithPassword')
  const register = () => authRequest('signUp')
  
// create sign up function and creat data object to pass into the method.
  const authRequest = (method) => {
    const data = {
      email,
      password,
      returnSecureToken: true
    }
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyA-3vqpsFW_ztP0O9sMq4B8CY7yFJeBFdM`, data)
    .then(res => {
      const { idToken, localId, expiresIn } = res.data
      // creating a one hour timer which will be set everytime upon logging into the website.
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

      setToken(idToken)
      setLocalid(localId)
      localStorage.setItem('idToken', idToken)
      localStorage.setItem('localId', localId)
      localStorage.setItem('expirationDate', expirationDate)
      checkAuthtimeout(expiresIn)
    })
    .catch((error) => {
      console.log(error)
    })
  }


    // logs the user out the user page.
    const logout = () => {
      setToken(null)
      localStorage.removeItem('idToken')
      localStorage.removeItem('localId')
      localStorage.removeItem('expirationDate')
    }
    
    const checkAuthentication = () => {
      const idToken = localStorage.getItem('idToken')
      if(!idToken) {
        logout()
      } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if(expirationDate < new Date()) {
          logout()
        } else {
          setToken(idToken)
          const expiresTime = (expirationDate.getTime() - new Date().getTime()) / 1000
          checkAuthtimeout(expiresTime)
        } 
      }
    }
  
    const checkAuthtimeout = (expiresIn) => {
      setTimeout(() => {
        logout()
      }, expiresIn * 1000)
    }

    const itemModalhandler = (id) => {
      console.log(id)
    }


  const state = {
    setEmail,
    setPassword,
    login,
    register,
    idToken,
    logout,
    checkAuthentication,
    localId,
    itemModalhandler,
  }
  
  return (
    <AuthContext.Provider value={state}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
