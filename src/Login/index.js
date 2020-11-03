import React from 'react'
import {useHistory} from 'react-router-dom'
// import AuthService from '../services/auth'
import * as Auth from '../utils/auth'

export default () => {

  const history = useHistory()

  const [credentials, setCredentials] = React.useState({username: 'jrk-mel', password: '123'})

  function onChange(e) {
    const value = e.target.value
    const formFieldName = e.target.name
    setCredentials({...credentials, [formFieldName]: value}) 
  }

  function onSubmit(e) {
    e.preventDefault()

    Auth.login(credentials)
    .then( res => {
        history.push('/')
    })
    .catch( err => {throw new Error(err)} )

  }

  return (
    <form onSubmit={onSubmit}>
            <input type="text" name="username" value={credentials.username} onChange={onChange} />
            <input type="password" name="password" value={credentials.password} onChange={onChange} />
            <input type="submit" value="Login" />
          </form>
  )

}