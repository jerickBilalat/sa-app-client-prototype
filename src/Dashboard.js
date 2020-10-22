import React from 'react'
import List from './components/List'
import currency from 'currency.js'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import AuthService from './services/auth'

const BASE_API_URL = "http://localhost:8080/api"


function Dashboard({totalTransactionAmount, totalBudgetBeforeTransactions, totalBudgetAfterSpending, emrFund, goals, setGoals, setfixedSpendings, fixedSpendings, setSpendingTransactions, currentPayPeriod, setCurrentPayPeriod, spendingTransactions}) {

  const history = useHistory()

// React.useEffect(() => {
//   if(!AuthService.getUser()) return history.replace('/login')
// })

 React.useEffect( () => {
    
    async function getData() {
      const result = await axios(`${BASE_API_URL}/pay-period/current`)
        setCurrentPayPeriod(result.data)
    }
    getData()
  }, [setCurrentPayPeriod])

  
  

  return (
    <>
      {currentPayPeriod 
      ? <div>
          <button><Link to='create_pay_period'>Create Pay Period</Link></button>
          <p>Budget Health: {currentPayPeriod.budgetHealth}</p>
          <p>Pay Period Id: {currentPayPeriod.currentPayPeriod._id && currentPayPeriod.currentPayPeriod._id }</p>
          <p>Curent Pay Period Pay: {currentPayPeriod.currentPayPeriod.pay}</p>

          <hr />

          <p>Current Emergency Fund Status: {currency(emrFund.remainingBalance).value === currency(emrFund.goalAmount).value ? currency(emrFund.remainingBalance).format() : currency(emrFund.remainingBalance).add(emrFund.commitmentAmount).format()} / {emrFund.goalAmount}</p>
          <p>Commitment per Pay Check: {currency(emrFund.commitmentAmount).format()}</p>

          <hr />

          <h1>{totalTransactionAmount}/{totalBudgetBeforeTransactions}</h1>
          <p>Remaining Budget: {totalBudgetAfterSpending}</p>  
        
          <List list={spendingTransactions} setList={setSpendingTransactions} payPeriod={currentPayPeriod} POSTurl={`${BASE_API_URL}/spending-transaction/create-spending-transaction`}/>

          <hr />
          
          <List list={fixedSpendings} setList={setfixedSpendings} payPeriod={currentPayPeriod} POSTurl={`${BASE_API_URL}/fixed-spending/create-fixed-spending`} />

          <List list={goals} setList={setGoals} payPeriod={currentPayPeriod} POSTurl={`${BASE_API_URL}/goal/create-goal`} />

        </div>
        : <button>Create First Pay Period</button>
      }
      
    </>
    
  );
}

export default Dashboard;
