import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'

function CreatePayPeriod({onChange, payPeriod}) {

  let match = useRouteMatch()

  return (
    <>
      <p>How much is your total pay?</p>
      <form>
        <input type="number" name="pay" onChange={onChange} value={payPeriod.pay}/>
      </form>
      <button><Link to={'/'}>Cancel</Link></button>
      {payPeriod.pay > 0 && <button><Link to={`${match.url}/add_fixed_spending`}>Next</Link></button>}
    </>
  )
}

export default CreatePayPeriod