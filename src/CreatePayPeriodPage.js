import React from 'react'
import CreatePayPeriod from './CreatePayPeriodForm/CreatePayPeriod'

function CreatePayPeriodPage({setRoute}) {

  // create pay period
  // add fixed spending and goals
    // get current set of fixed spending and goals to populated list
  // re route to dashboard


  const [ formStep, setFormStep ] = React.useState(1)

  return (
    <>
      <CreatePayPeriod setRoute={setRoute} formStep={formStep} setFormStep={setFormStep} />
      <AddFixedSpendings formStep={formStep} setFormStep={setFormStep} />
      <AddGoals formStep={formStep} setFormStep={setFormStep} />
      <Confirm formStep={formStep} setFormStep={setFormStep} setRoute={setRoute}/>
    </>
  )
}

export default CreatePayPeriodPage

function AddFixedSpendings({formStep, setFormStep}) {
  if(formStep !== 2) return null
  return (
    <>
      <p>Check fixed spendings that still applies to this pay period?</p>
      <p>NOTE: Unchecked spendings will automatically get ended by default.</p>
      <p>You can add new spending late on the dashboard</p>
      <button onClick={() => setFormStep(3)}>Next</button>
    </>
  )
}

function AddGoals({formStep, setFormStep}) {
  if(formStep !== 3) return null
  return (
    <>
      <p>Check fixed goals that still applies to this pay period?</p>
      <p>NOTE: Unchecked goals will automatically get ended by default.</p>
      <p>You can add new goals late on the dashboard</p>
      <button onClick={() => setFormStep(2)}>Prev</button>
      <button onClick={() => setFormStep(4)}>Next</button>
    </>
  )
}

function Confirm({formStep, setFormStep, setRoute}) {
  if(formStep !== 4) return null
  return (
    <>
      <p>Please confirm all spendings and goals are correct.</p>
      <button onClick={() => setFormStep(3)}>Prev</button>
      <button onClick={() => setRoute('/')}>Create</button>
    </>
  )
}