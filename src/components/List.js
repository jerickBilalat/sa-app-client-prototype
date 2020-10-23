import React from 'react'
import currency from 'currency.js'
import { client } from '../utils/api-client'
import * as auth from '../utils/auth'

function List({list, setList, payPeriod, POSTurl}) {

  const [ listItem, setListItem] = React.useState({description: "", amount: 0})

  function onChange(e) {
    const target = e.target
    setListItem({...listItem, [target.name]: target.value})
  }

  function onSubmit(e) {
    e.preventDefault()

    client(POSTurl, { 
      data: {description: listItem.description, amount: currency(listItem.amount).toString(), payPeriodId: payPeriod.payPeriod._id},
      token: auth.getToken()
    })
      .then( result => {
        return setList([...list, result])})
      .catch( e => {throw new Error(e)})
      .then(() => {
        setListItem({...listItem, description: "", amount: 0})
      })
    
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="description" onChange={onChange} value={listItem.description}/>
        <input type="number" name="amount" onChange={onChange} value={listItem.amount} />
        <button type="sumibt">Add</button>
      </form>
      
      <ul>
        {list.map( x => (
          <li key={x._id}>{x.description} .... {x.amount}</li>
        ))}
      </ul>
    </>
  )
}
export default List;
