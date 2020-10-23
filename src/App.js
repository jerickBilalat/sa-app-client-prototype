import React from 'react'
import {client} from './utils/api-client'
import * as Auth from './utils/auth'
import AuthenticatedApp from './authenticatted-app'
import UnAuthenticatedApp from './unAuthenticated-app'

const BASE_API_URL = "http://localhost:8080/api"


function App() {

  const [userSettings, setUserSettings] = React.useState(null)

  React.useEffect( () => {
    client('/auth/get_user', {token: Auth.getToken()})
      .then( data => {
        return setUserSettings(data)
      })
  }, [])

  const login = credentials => Auth.login(credentials).then( user => setUserSettings(user) )
  const register = userSettings => Auth.register(userSettings).then( user => setUserSettings(user) )
  const logout = () => Auth.logout().then( () => setUserSettings(null))

  const props = { userSettings, login, register, logout }
  return Auth.isAuthenticated() && userSettings
    ? <AuthenticatedApp {...props} />
    : <UnAuthenticatedApp {...props} />

}

export default App;
