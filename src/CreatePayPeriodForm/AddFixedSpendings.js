import React from 'react'
import { Link } from 'react-router-dom'

function AddFixedSpendings({fixedSpendings, setFixedSpendings, endingSpendings, setEndingSpendings}) {

  return (
    <>
      <p>Check fixed spendings that still applies to this pay period?</p>
      <p>NOTE: Unchecked spendings will automatically get ended by default.</p>
      <p>You can add new spending late on the dashboard</p>

      <ul>
        {fixedSpendings.map(x =>(
          <li key={x._id}>
            {x.description} --- {x.amount}
            <button onClick={() => setEndingSpendings([...endingSpendings, x._id])}>
              { endingSpendings.includes(x._id) ? "Ended": "End"}
            </button>
          </li>
        ))
}      </ul>
    <button><Link to={'/create_pay_period'}>Prev</Link></button>
    <button><Link to={'add_goals_spending'}>Next</Link></button>

    </>
  )
}

export default AddFixedSpendings