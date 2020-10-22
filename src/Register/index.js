import React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import AuthService from '../services/auth'
import currency from 'currency.js'

const BASE_API_URL = "http://localhost:8080/api"

const initialEmrFundState = {
  remainingBalance: 0.00,
  averagePayPerPeriod: 0.00,
  numberOfPayPeriodPerMonth: 2,
  commitmentAmount: 0.00
}
export default () => {

  const history = useHistory()

  const [user, setUser] = React.useState({name: '', password: ''})
  const [initialPay, setInitialPay] = React.useState(0.00)
  const [initialEmrFund, setInitialEmrFund] = React.useState(initialEmrFundState)

  function onChange(e) {
    const value = e.target.value
    const formFieldName = e.target.name
    setUser({...user, [formFieldName]: value}) 
  }

  function onSubmit(e) {
    e.preventDefault()

    axios.post(
      `${BASE_API_URL}/auth/register`,
      {
        name: user.name,
        password: user.password
      }
    )
    .then( res => {
      
      AuthService.setToken(res.data.token)

      history.push('/')
    })
    .catch( err => {throw new Error(err)} )

  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={user.name} onChange={onChange} />
      <input type="password" name="password" value={user.password} onChange={onChange} />
      <hr />
      <input type="number" name="initialPay" value={initialPay} />

      <hr />

      <input type="number" name="remainingBalance" value={initialEmrFund.remainingBalance} />
      <input type="number" name="averagePayPerPeriod" />
      <input type="number" name="numberOfPayPeriodPerMonth" />
      <input type="number" name="commitmentAmount" />

      <input type="submit" value="Register" />
    </form>
  )

}