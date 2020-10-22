import decode from 'jwt-decode'
import axios from 'axios'

const localStorageKey = '__auth_provider_token__'

function getTokenExpirationDate(token) {
  const decoded = decode(token)
  if(!decoded.exp) {
    return null
  }

  const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp)
  return date
}

function isTokenExpired(token) {
  const date = getTokenExpirationDate(token)
  const offsetSeconds = 0
  if (date === null) {
    return false
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}

function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

function setToken(token) {
  return window.localStorage.setItem(localStorageKey, token)
}

function isAuthenticated() {
  const token = getToken()
  if(token){
    return !isTokenExpired(token)
  }else {
    return false
  }
}

function getDecodedToken() {
  return (isAuthenticated() && decode(getToken())) || null
}

// function login(credentials) {
//   return api
//     .post('/auth/signin', credentials)
//     .then( res => {
//       AuthUtils.setToken(res.data.token)
//       return AuthUtils.getUser(res.data.token)
//     })
// }

// function register(credentials) {
//   return api
//     .post('/auth/signup', credentials)
//     .then( res => {
//       AuthUtils.setToken(res.data.token)
//       return AuthUtils.getUser(res.data.token)
//     })
// }

// ken't code
// BELOW !!!!!!

// async function getToken1() {
//   // if we were a real auth provider, this is where we would make a request
//   // to retrieve the user's token. (It's a bit more complicated than that...
//   // but you're probably not an auth provider so you don't need to worry about it).
//   return window.localStorage.getItem(localStorageKey)
// }

function handleUserResponse({user, token}) {
    setToken(token)
    return user
}

function login({username, password}) {
  if(!username || !password) throw new Error('must provide username and password')
  return client('/auth/signin', {username, password}).then(handleUserResponse)
}

function register({username, password}) {
  return client('/auth/register', {username, password}).then(handleUserResponse)
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

// auth provider own client
async function client( endpoint, data) {
    const config = {
        method: 'POST',
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoint,
        data: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }
    
    return axios(config)
    .then(
          res => {        
            const data = res.data
            if(res.status === 200) {
                return data
            }else {
                return Promise.reject(data)
            }

        }
    )
}

export {getToken, isAuthenticated, login, register, logout, localStorageKey}
