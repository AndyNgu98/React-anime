import React, {useContext} from 'react'
import {AuthContext} from '../../Context/auth-context'
import './Auth.css'
import {Redirect} from 'react-router-dom'

const Auth = (props) => {

  const {setEmail, setPassword, login, register, idToken} = useContext(AuthContext)

  if(idToken != null) {
    return <Redirect to='/user'/>
    // props.history.replace('/user')
  }

  return (
    <section className="section auth">
      <div className="container login">
        <div>
          <div className="form-control">
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email"/>
          </div>

          <div className="form-control">
            <label >Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password"/>
          </div>

          <div className="form__actions">
            <button onClick={login}>Log In</button>
            <button onClick={register}>Register</button>
          </div>
          </div>
      </div>
    </section>
  )
}

export default Auth
