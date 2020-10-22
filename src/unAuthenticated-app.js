import React from 'react'
export default ({login, register}) => {

  const [credentials, setCredentials] = React.useState({username: 'jrk-mel', password: '123'})

  function onChange(e) {
    const value = e.target.value
    const formFieldName = e.target.name
    setCredentials({...credentials, [formFieldName]: value}) 
  }

  function onSubmit(e) {
    e.preventDefault()
    login(credentials)
    .catch( err =>{ throw new Error(Error)})
  }

  return (
    <form onSubmit={onSubmit}>
            <input type="text" name="username" value={credentials.username} onChange={onChange} />
            <input type="password" name="password" value={credentials.password} onChange={onChange} />
            <input type="submit" value="Login" />
          </form>
  )

}