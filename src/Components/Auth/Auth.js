import React, {useContext} from 'react'
import Card from '../../UI/Card'
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
    <div className="auth">
      <Card>
        <div>
          <div className="form-control">
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email"/>
          </div>

          <div className="form-control">
            <label >Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password"/>
          </div>

          <div className="ingredient-form__actions">
            <button onClick={login}>Log In</button>
            <button onClick={register}>Register</button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Auth
