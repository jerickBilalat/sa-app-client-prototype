import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'


function Confirm({onSubmit, fixedSpendings, endingSpendings, goals, endingGoals}) {
  return (
    <>
      <p>Please confirm all spendings and goals that will be applied to this period.</p>
      
      <hr />

      <p>Fixed Spending:</p>
      <ul>
        {fixedSpendings
          .map( x => {
            return endingSpendings.includes(x._id) 
            ? <li key={x._id}><p style={{textDecoration: "line-through"}}>{x.description}</p></li>
            : <li key={x._id}><p>{x.description}</p></li>
          })
        }
      </ul>

      <hr />

      <p>Goals Spending:</p>
      <ul>
        {goals
          .map( x => {
            return endingGoals.includes(x._id) 
            ? <li key={x._id}><p style={{textDecoration: "line-through"}}>{x.description}</p></li>
            : <li key={x._id}><p>{x.description}</p></li>
          })
        }
      </ul>

      <button><Link to={'add_goals_spending'}>Prev</Link></button>
      <button onClick={ e => onSubmit(e) }>Create</button>
    </>
  )
}

export default Confirm