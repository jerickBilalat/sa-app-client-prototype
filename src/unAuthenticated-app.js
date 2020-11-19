import React from 'react'
import currency from 'currency.js'
export default ({login, register}) => {

  const [newUser, setNewUser] = React.useState({username: 'jrk-mel', password: 'jerixm26', confirmPassword:'jerixm26', emrtype: 3, emrRemainingBalance: 0, emrCommitmentAmount: "100", averagePayPerPeriod: "1600", numberOfPayPeriodPerMonth: 2})
  const [isNewUser, setIsNewUser] = React.useState(false)
  const [credentials, setCredentials] = React.useState({username: '', password: ''})
  const [registerFormErrors, setRegisterFormErrors] = React.useState({})
  const [loginFormErrors, setLoginFormErrors] = React.useState({})
  const [isRegisterFormValid, setIsRegisterFormValid] = React.useState(true)
  const [isLoginFormValid, setIsLoginFormValid] = React.useState(true)

  function onChangeOnLogin(e) {
    const value = e.target.value
    const formFieldName = e.target.name
    setCredentials({...credentials, [formFieldName]: value}) 
  }
  function onChangeOnRegister(e) {
    const value = e.target.value
    const formFieldName = e.target.name
    setNewUser({...newUser, [formFieldName]: value}) 
  }

  function onLogin(e) {
    e.preventDefault()
    validateLoginForm()
    if(!isLoginFormValid) return
    console.log("logining in ...")
    login(credentials)
    .catch( err =>{ throw new Error(Error)})
  }

  function onRegister(e) {
    e.preventDefault()
    if(!isRegisterFvalid()) return
    console.log("registering in ...")
    // todo how is form fields converted to string
    const args = normalizeFormFieldVaules(newUser)
    register({...args})
        .then( () => window.location.assign(window.location.origin))
        .catch( err =>{ throw new Error(err)})
    
  }

  function normalizeFormFieldVaules(form) {
    return {
      ...form,
      emrCommitmentAmount: currency(form.emrCommitmentAmount, {precision: 2}).value.toString(),
      emrRemainingBalance: currency(form.emrRemainingBalance, {precision: 2}).value.toString(),
      averagePayPerPeriod: currency(form.averagePayPerPeriod, {precision: 2}).value.toString(),
      emrType: currency(form.emrType).value,
      numberOfPayPeriodPerMonth: currency(form.numberOfPayPeriodPerMonth).value
    }
  }

  function validateLoginForm() {
    return
  }

  function isRegisterFvalid() {
    const inputNames = Object.keys(newUser)
    let formIsValid = true
    const errors = {
      username: '', password: '', confirmPassword:'', emrtype: '', emrRemainingBalance: '', emrCommitmentAmount: '', averagePayPerPeriod: '', numberOfPayPeriodPerMonth: ''
    }

    inputNames.forEach( inputName => {

      if(['emrCommitmentAmount', 'averagePayPerPeriod','numberOfPayPeriodPerMonth'].includes(inputName) && (newUser[inputName] === "0" || newUser[inputName] <= 0)) {
        errors[inputName] += `${inputName} has to be more than 0; `;
        formIsValid = formIsValid && false;
      }
      if(["username", "password"].includes(inputName) && newUser[inputName].length < 6 ) {
        errors[inputName] += `${inputName} needs to be more than 6 chracters; `;
        formIsValid = formIsValid && false;
      }
      if(newUser.confirmPassword !== newUser.password) {
        errors['confirmPassword'] += 'value did not match entered password; ';
        formIsValid = formIsValid && false;
      }
    })

    setIsRegisterFormValid(formIsValid)
    setRegisterFormErrors({...registerFormErrors, ...errors})
    return formIsValid
  }

  return (
    isNewUser
    ? <RegistrationForm 
        onSubmit={ e => onRegister(e)} 
        newUser={newUser}
        onChange={onChangeOnRegister}
        setIsNewUser={setIsNewUser}
        errors={registerFormErrors}
        />
    : <LoginForm 
        onSubmit={ e => onLogin(e)}
        credentials={credentials}  
        onChange={onChangeOnLogin}
        setIsNewUser={setIsNewUser}
        />
  )

}

function LoginForm({onSubmit, credentials, onChange, setIsNewUser}) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="username" value={credentials.username} onChange={onChange} />
      <input type="password" name="password" value={credentials.password} onChange={onChange} />
      <input type="submit" value="Submit" />
      <p>New user?</p>
      <input type="button" value="Register" onClick={() => setIsNewUser(true)}/>
    </form>
  )
}


function RegistrationForm({onSubmit, newUser, onChange, setIsNewUser, errors}) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">Name</label>
      <input type="text" name="username" value={newUser.username} onChange={onChange} />
      <p>{errors.username}</p>
      <label htmlFor="password">password</label>
      <input type="password" name="password" value={newUser.password} onChange={onChange} />
      <label htmlFor="confirmPassword">confirmPassword</label>
      <input type="password" name="confirmPassword" value={newUser.confirmPassword} onChange={onChange} />
      <hr />
      <label htmlFor="averagePayPerPeriod">averagePayPerPeriod</label>
      <input 
        type="number" 
        name="averagePayPerPeriod"
        value={newUser.averagePayPerPeriod}
        onChange={onChange} />
      <label htmlFor="numberOfPayPeriodPerMonth">numberOfPayPeriodPerMonth</label>
      <input 
        type="number" 
        name="numberOfPayPeriodPerMonth"
        value={newUser.numberOfPayPeriodPerMonth}
        onChange={onChange} />
      <hr />
      <label htmlFor="emrtype">emrtype</label>
      <input 
        type="number" 
        name="emrtype"
        value={newUser.emrtype} 
        onChange={onChange} />
      <label htmlFor="emrRemainingBalance">emrRemainingBalance</label>
      <input 
        type="number" 
        name="emrRemainingBalance"
        value={newUser.emrRemainingBalance} 
        onChange={onChange} />
      <label htmlFor="emrCommitmentAmount">emrCommitmentAmount</label>
      <input 
        type="number" 
        name="emrCommitmentAmount"
        value={newUser.emrCommitmentAmount} 
        onChange={onChange} />
      <input type="submit" value="Register" />
      <p>Already a user?</p>
      <input type="button" value="Login" onClick={() => setIsNewUser(false)}/>
    </form>
  )
}
