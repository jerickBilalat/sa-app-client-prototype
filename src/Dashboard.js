import React from 'react'
import List from './components/List'
import {Link} from 'react-router-dom'
import {getEmrStats, format, calculateTotalAmount} from './services/calculateBudget'
import currency from 'currency.js'


function Dashboard({userSettings, totalTransactionAmount, totalBudgetBeforeTransactions, totalBudgetAfterSpending, goals, setGoals, setfixedSpendings, fixedSpendings, setSpendingTransactions, currentPayPeriod, setCurrentPayPeriod, spendingTransactions, freeSpendingTransactions, setFreeSpendingTransactions}) {
  
  if(!currentPayPeriod) return <Link to="/create_pay_period" >Create First Pay Period</Link>
  const {emrGoalAmount, emrStatus} = getEmrStats(userSettings, spendingTransactions, fixedSpendings, goals, currentPayPeriod.payPeriod.pay, currentPayPeriod.budgetHealth)

  return (
    <> <div>
          <p>Budget Health: {currency(currentPayPeriod.budgetHealth).subtract(calculateTotalAmount(freeSpendingTransactions)).format()}</p>
          <p>Pay Period Id: {currentPayPeriod.payPeriod._id && currentPayPeriod.payPeriod._id }</p>
          <p>Curent Pay Period Pay: {format(currentPayPeriod.payPeriod.pay)}</p>

          <hr />

          <p>Current Emergency Fund Status: {emrStatus} / {emrGoalAmount}</p>
          <p>Commitment per Pay Check: {format(userSettings.emrCommitmentAmount)}</p>

          <hr />

          <h1>{totalTransactionAmount}/{totalBudgetBeforeTransactions}</h1>
          <p>Remaining Budget: {totalBudgetAfterSpending}</p>  

          <List list={spendingTransactions} setList={setSpendingTransactions} payPeriod={currentPayPeriod} POSTurl={'/spending-transaction/create-spending-transaction'}/>

          <hr />
          <p>Bills</p>
          <List list={fixedSpendings} setList={setfixedSpendings} payPeriod={currentPayPeriod} POSTurl={'/fixed-spending/create-fixed-spending'} />
          <hr />
          <p>Goals</p>
          <List list={goals} setList={setGoals} payPeriod={currentPayPeriod} POSTurl={'/goal/create-goal'} />

        </div>
    </>
    
  );
}

export default Dashboard;
