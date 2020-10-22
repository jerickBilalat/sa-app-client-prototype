import React from 'react'
import axios from 'axios'
import {client} from './utils/api-client'
import {calculateBudget} from './services/calculateBudget'
import * as Auth from './utils/auth'
import AuthenticatedApp from './authenticatted-app'
import UnAuthenticatedApp from './unAuthenticated-app'
import Layout from './components/Layout'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { SignalCellularNullRounded } from '@material-ui/icons'

const BASE_API_URL = "http://localhost:8080/api"


function App() {

  const [userSettings, setUserSettings] = React.useState(null)

  const [currentPayPeriod, setCurrentPayPeriod] = React.useState(null)
  const [newPayPeriod, setNewPayPeriod] = React.useState({pay: 0})
  
  const [ spendingTransactions, setSpendingTransactions ] = React.useState([])

  const [ fixedSpendings, setfixedSpendings ] = React.useState([])
  const [endingSpendings, setEndingSpendings] = React.useState([])

  const [ goals, setGoals ] = React.useState([])
  const [endingGoals, setEndingGoals] = React.useState([])

  const [credentials, setCredentials] = React.useState({username: 'jrk-mel', password: '123'})

  
  // const [emrFund, setEmrFund] = React.useState({type: 3, numberOfPayPeriodPerMonth: 2, averagePayPerPeriod: "0.00", remainingBalance: "0.00", commitmentAmount: "0.00", goalAmount: "0.00" })
 
  // React.useEffect( () => {
  //   async function getData() {
  //     const result = await axios(`${BASE_API_URL}/pay-period/current`)
  //       setCurrentPayPeriod(result.data)
  //   }
  //   getData()
  // }, [])

  React.useEffect( () => {
    client('/auth/get_user', {token: Auth.getToken()})
      .then( data => {
        return setUserSettings(data)
      })
  }, [])

  React.useEffect( () => {
    async function getData() {

      if(currentPayPeriod) {
        const result = await axios(`${BASE_API_URL}/spending-transaction/by-pay-period?payPeriodId=${currentPayPeriod.currentPayPeriod._id}`)
        setSpendingTransactions(result.data)
      }
      return
    }
    getData()
  }, [currentPayPeriod])

  React.useEffect( () => {
    async function getData() {

      if(currentPayPeriod) {
        const result = await axios(`${BASE_API_URL}/goal/by-pay-period?payPeriodId=${currentPayPeriod.currentPayPeriod._id}`)
        setGoals(result.data)
      }
      return
    }
    getData()
  }, [currentPayPeriod])

  React.useEffect( () => {
    async function getData() {

      if(currentPayPeriod) {
        const result = await axios(`${BASE_API_URL}/fixed-spending/by-pay-period?payPeriodId=${currentPayPeriod.currentPayPeriod._id}`)
        setfixedSpendings(result.data)
      }
      return
    }
    getData()
  }, [currentPayPeriod])

  let totalBudgetBeforeTransactions, totalBudgetAfterSpending, totalTransactionAmount


  const login = credentials => Auth.login(credentials).then( user => setUserSettings(user) )
  const register = userSettings => Auth.register(userSettings).then( user => setUserSettings(user) )
  const logout = () => Auth.logout().then( () => setUserSettings(null))

  const props = { userSettings, login, register, logout }
  return Auth.isAuthenticated() && userSettings
    ? <AuthenticatedApp {...props} />
    : <UnAuthenticatedApp {...props} />

}

export default App;
