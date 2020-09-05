import React from 'react'
import CreatePayPeriod from './CreatePayPeriod'
import AddFixedSpendings from './AddFixedSpendings'
import AddGoals from './AddGoals'
import Confirm from './Confirm'
import axios from 'axios'
import currency from 'currency.js'
import {useHistory, Route, Switch, useRouteMatch} from 'react-router-dom'

const BASE_API_URL = "http://localhost:8080/api"

function CreatePayPeriodPage({setRoute, totalBudgetAfterSpending, goals, setGoals, endingGoals, setEndingGoals, newPayPeriod, setNewPayPeriod, currentPayPeriod, setCurrentPayPeriod, fixedSpendings, setFixedSpendings, endingSpendings, setEndingSpendings}) {

  let match = useRouteMatch()
  let history = useHistory()

  const [ formStep, setFormStep ] = React.useState(1)

  function onChange(e) {
    const target = e.target
    setNewPayPeriod({...newPayPeriod, [target.name]: target.value})
  }

  function onSubmit(e) {
    e.preventDefault()
    axios.post(
      `${BASE_API_URL}/pay-period/create-pay-period`, 
      {
        pay: currency(newPayPeriod.pay),
        prevPayPeriodID: currentPayPeriod.currentPayPeriod._id,
        remainingBudget: totalBudgetAfterSpending,
        continuedFixedSpendings: fixedSpendings
          .filter( x => !endingSpendings.includes(x._id))
          .map( x => x._id),
        continuedGoals: goals
          .filter( x => !endingGoals.includes(x._id))
          .map( x => x._id)
      })
    .then( res =>  {
      if(res.data.status === "ok") return history.replace('/')
    })
    .catch( e => console.error(e))
  }

  return (
    <>
      <Switch>
        <Route path={`${match.url}/add_fixed_spending`}>
          <AddFixedSpendings 
            fixedSpendings={fixedSpendings} 
            setFixedSpendings={setFixedSpendings}
            endingSpendings={endingSpendings}
            setEndingSpendings={setEndingSpendings}
            formStep={formStep} 
            setFormStep={setFormStep} />
        </Route>
        <Route path={`${match.url}/add_goals_spending`}>
          <AddGoals 
            goals={goals}
            endingGoals={endingGoals}
            setEndingGoals={setEndingGoals} />
        </Route>
        <Route path={`${match.url}/confirm`}>
          <Confirm
            onSubmit={onSubmit}
            fixedSpendings={fixedSpendings}
            endingSpendings={endingSpendings}
            goals={goals}
            endingGoals={endingGoals}/>
        </Route>
        <Route path={match.url}>
          <CreatePayPeriod 
            payPeriod={newPayPeriod} 
            onChange={onChange} />
        </Route>
      </Switch>
    </>
  )
}

export default CreatePayPeriodPage