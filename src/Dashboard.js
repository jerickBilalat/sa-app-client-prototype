import React from 'react'
import List from './components/List'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {getEmrStats, format} from './services/calculateBudget'

const BASE_API_URL = "http://localhost:8080/api"


function Dashboard({userSettings, totalTransactionAmount, totalBudgetBeforeTransactions, totalBudgetAfterSpending, goals, setGoals, setfixedSpendings, fixedSpendings, setSpendingTransactions, currentPayPeriod, setCurrentPayPeriod, spendingTransactions}) {
  
  const {emrGoalAmount, emrStatus} =getEmrStats(userSettings)

  return (
    <>
      {currentPayPeriod 
      ? <div>
          <button><Link to='create_pay_period'>Create Pay Period</Link></button>
          <p>Budget Health: {currentPayPeriod.budgetHealth}</p>
          <p>Pay Period Id: {currentPayPeriod.payPeriod._id && currentPayPeriod.payPeriod._id }</p>
          <p>Curent Pay Period Pay: {format(currentPayPeriod.payPeriod.pay)}</p>

          <hr />

          <p>Current Emergency Fund Status: {emrStatus} / {emrGoalAmount}</p>
          <p>Commitment per Pay Check: {format(userSettings.emrCommitmentAmount)}</p>

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
