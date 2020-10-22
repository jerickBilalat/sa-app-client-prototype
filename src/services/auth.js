import decode from 'jwt-decode'

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
  return window.localStorage.getItem('token')
}

function setToken(token) {
  return window.localStorage.setItem('token', token)
}

function isAuthenticated() {
  const token = getToken()
  if(token){
    return !isTokenExpired(token)
  }else {
    return false
  }
}

function isAdmin() {
  return decode(getToken()).admin || false
}

function removeToken() {
  return window.localStorage.removeItem('token')
}

function getUser() {
  return (isAuthenticated() && decode(getToken())) || null
}

export default {
  getUser,
  setToken,
  getToken,
  isAdmin,
  removeToken
}