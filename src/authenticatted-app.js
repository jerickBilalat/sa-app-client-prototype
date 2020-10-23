import React from 'react'
import {calculateBudget} from './services/calculateBudget'
import Dashboard from './Dashboard'
import CreatePayPeriodPage from './CreatePayPeriodForm'
import * as Auth from './utils/auth'
import Layout from './components/Layout'
import { client } from './utils/api-client'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function AuthenticatedApp({userSettings, logout}) {

  const [currentPayPeriod, setCurrentPayPeriod] = React.useState(null)
  const [newPayPeriod, setNewPayPeriod] = React.useState({pay: 0})
  
  const [ spendingTransactions, setSpendingTransactions ] = React.useState([])

  const [ fixedSpendings, setfixedSpendings ] = React.useState([])
  const [endingSpendings, setEndingSpendings] = React.useState([])

  const [ goals, setGoals ] = React.useState([])
  const [endingGoals, setEndingGoals] = React.useState([])

  const [credentials, setCredentials] = React.useState({username: 'jrk-mel', password: '123'})

  
 
  React.useEffect( () => {
    client('/pay-period/current', {token: Auth.getToken()})
      .then( data => {
        setCurrentPayPeriod(data)
      })
  }, [])

  React.useEffect( () => {
    function getSpendingTransactions() {

      if(currentPayPeriod) {
        
        const payPeriodID = currentPayPeriod.payPeriod._id

        client(`/spending-transaction/by-pay-period?payPeriodId=${payPeriodID}`, {token: Auth.getToken()})
        .then( data => {
          setSpendingTransactions(data)
        })

      }
      return
    }
    getSpendingTransactions()
  }, [currentPayPeriod])

  React.useEffect( () => {
    function getData() {

      if(currentPayPeriod) {
        
        const payPeriodID = currentPayPeriod.payPeriod._id

        client(`/goal/by-pay-period?payPeriodId=${payPeriodID}`, {token: Auth.getToken()})
        .then( data => {
          setGoals(data)
        })

      }
      return
    }
    getData()

  }, [currentPayPeriod])

  React.useEffect( () => {
    function getData() {

      if(currentPayPeriod) {
        
        const payPeriodID = currentPayPeriod.payPeriod._id

        client(`/fixed-spending/by-pay-period?payPeriodId=${payPeriodID}`, {token: Auth.getToken()})
        .then( data => {
          setfixedSpendings(data)
        })

      }
      return
    }
    getData()
  }, [currentPayPeriod])

  let totalBudgetBeforeTransactions, totalBudgetAfterSpending, totalTransactionAmount

  if(currentPayPeriod) {
    [totalBudgetBeforeTransactions, totalBudgetAfterSpending, totalTransactionAmount] = calculateBudget(userSettings, spendingTransactions, fixedSpendings, goals, currentPayPeriod.payPeriod.pay, currentPayPeriod.budgetHealth)
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/create_pay_period">Start next period</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/create_pay_period">
            <Layout logout={logout}>
              <h1>Create pay</h1>
                {/* <CreatePayPeriodPage 
                  newPayPeriod={newPayPeriod}
                  setNewPayPeriod={setNewPayPeriod}
                  currentPayPeriod={currentPayPeriod}
                  setCurrentPayPeriod={setCurrentPayPeriod}
                  fixedSpendings={fixedSpendings}
                  endingSpendings={endingSpendings}
                  setEndingSpendings={setEndingSpendings}
                  setfixedSpendings={setfixedSpendings} 
                  goals={goals}
                  setGoals={setGoals}
                  endingGoals={endingGoals}
                  setEndingGoals={setEndingGoals}
                  totalBudgetAfterSpending={totalBudgetAfterSpending} /> */}
            </Layout>
            </Route>
          <Route path="/">
            <Layout logout={logout}>
                <h1>Dashboard</h1>
              <Dashboard 
                currentPayPeriod={currentPayPeriod}
                setCurrentPayPeriod={setCurrentPayPeriod}
                spendingTransactions={spendingTransactions}
                setSpendingTransactions={setSpendingTransactions}
                fixedSpendings={fixedSpendings}
                setfixedSpendings={setfixedSpendings} 
                goals={goals}
                setGoals={setGoals}
                userSettings={userSettings}
                totalBudgetBeforeTransactions={totalBudgetBeforeTransactions}
                totalBudgetAfterSpending={totalBudgetAfterSpending}
                totalTransactionAmount={totalTransactionAmount} />
            </Layout>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default AuthenticatedApp;
