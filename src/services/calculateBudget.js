import currency from 'currency.js'

export function calculateTotalAmount(collection) {
  if (collection.length === 0) return 0
  return collection
    .map( x => x.amount )
    .reduce( (a,b) => currency(a).add(b), 0 )
    .format()
}

export function calculateBudget(emrFund, spendingTransactions = [], fixedSpendings = [], goals = [], pay = 0, health = 0) {


  let totalBudgetBeforeTransactions

  if(currency(emrFund.remainingBalance).value !== currency(emrFund.goalAmount).value) {
    totalBudgetBeforeTransactions = currency(pay)
      .subtract(emrFund.commitmentAmount)
      .subtract(calculateTotalAmount(fixedSpendings))
      .subtract(calculateTotalAmount(goals))
      .format()
  }else {
    totalBudgetBeforeTransactions = currency(pay)
      .subtract(calculateTotalAmount(fixedSpendings))
      .subtract(calculateTotalAmount(goals))
      .format()
  }


  const totalTransactionAmount = currency(calculateTotalAmount(spendingTransactions)).format()

  const totalBudgetAfterSpending = currency(totalBudgetBeforeTransactions)
    .subtract(totalTransactionAmount)
    .format()
  

  return [totalBudgetBeforeTransactions, totalBudgetAfterSpending, totalTransactionAmount]
  
}