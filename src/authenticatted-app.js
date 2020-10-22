import React from 'react'
import axios from 'axios'
import {calculateBudget} from './services/calculateBudget'
import Dashboard from './Dashboard'
import CreatePayPeriodPage from './CreatePayPeriodForm'
import * as Auth from './utils/auth'
import Layout from './components/Layout'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const BASE_API_URL = "http://localhost:8080/api"


function AuthenticatedApp({userSettings, logout}) {

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

  // if(currentPayPeriod) {
  //   [totalBudgetBeforeTransactions, totalBudgetAfterSpending, totalTransactionAmount] = calculateBudget(emrFund, spendingTransactions, fixedSpendings, goals, currentPayPeriod.currentPayPeriod.pay, currentPayPeriod.budgetHealth)
  // }

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
              {/* <Dashboard 
                currentPayPeriod={currentPayPeriod}
                setCurrentPayPeriod={setCurrentPayPeriod}
                spendingTransactions={spendingTransactions}
                setSpendingTransactions={setSpendingTransactions}
                fixedSpendings={fixedSpendings}
                setfixedSpendings={setfixedSpendings} 
                goals={goals}
                setGoals={setGoals}
                emrFund={emrFund}
                setEmrFund={setEmrFund} 
                totalBudgetBeforeTransactions={totalBudgetBeforeTransactions}
                totalBudgetAfterSpending={totalBudgetAfterSpending}
                totalTransactionAmount={totalTransactionAmount} /> */}
            </Layout>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default AuthenticatedApp;
