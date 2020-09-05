import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

function AddGoals({goals, setGoals, endingGoals, setEndingGoals}) {

  return (
    <>
      <p>Check Goals that still applies to this pay period?</p>
      <p>You can add new spending late on the dashboard</p>

      <ul>
        {goals.map(x =>(
          <li key={x._id}>
            {x.description} --- {x.amount}
            <button 
              onClick={() => setEndingGoals([...endingGoals, x._id])}>
              { endingGoals.includes(x._id) ? "Ended": "End"}
            </button>
          </li>
        ))
}      </ul>

    <button><Link to={'add_fixed_spending'}>Prev</Link></button>
    <button><Link to={'confirm'}>Next</Link></button>

    </>
  )
}

export default AddGoals