import React from 'react'
import CreatePayPeriod from './CreatePayPeriod'
import AddFixedSpendings from './AddFixedSpendings'
import AddGoals from './AddGoals'
import Confirm from './Confirm'
import {client} from '../utils/api-client'
import * as auth from '../utils/auth'
import currency from 'currency.js'
import {useHistory, Route, Switch, useRouteMatch} from 'react-router-dom'

function CreatePayPeriodPage({setRoute, setUserSettings, totalBudgetAfterSpending, goals, setGoals, endingGoals, setEndingGoals, newPayPeriod, setNewPayPeriod, currentPayPeriod, setCurrentPayPeriod, fixedSpendings, setFixedSpendings, endingSpendings, setEndingSpendings}) {

  let match = useRouteMatch()

  const [ formStep, setFormStep ] = React.useState(1)

  function onChange(e) {
    const target = e.target
    setNewPayPeriod({...newPayPeriod, [target.name]: target.value})
  }

  function onSubmit(e) {
    e.preventDefault()

    client('/pay-period/create-pay-period',
      { data: {
        pay: currency(newPayPeriod.pay),
        prevPayPeriodID: currentPayPeriod && currentPayPeriod.payPeriod._id ? currentPayPeriod.payPeriod._id : null,
        remainingBudget: totalBudgetAfterSpending,
        continuedFixedSpendings: fixedSpendings
          .filter( x => !endingSpendings.includes(x._id))
          .map( x => x._id),
        continuedGoals: goals
          .filter( x => !endingGoals.includes(x._id))
          .map( x => x._id)
        },
        token: auth.getToken()
      }
    )
    .then( res  =>  {
      if(res.status === 'ok') {
        window.location.assign(window.location.origin)
      }
      return
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