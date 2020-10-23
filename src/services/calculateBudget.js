import currency from 'currency.js'

export function calculateTotalAmount(collection) {
  if (collection.length === 0) return 0
  return collection
    .map( x => x.amount )
    .reduce( (a,b) => currency(a).add(b), 0 )
    .value
}

function getNumberValue(amount) {
  return currency(amount).value
}

function isEmrGoalReached(emrSettings) {
  return getNumberValue(emrSettings.emrRemainingBalance) <= getNumberValue(calculateEmrGoalAmount(emrSettings))
}

export function calculateEmrStatus(userSettings) {
  const goalAmount = calculateEmrGoalAmount(userSettings)
  return getNumberValue(userSettings.remainingBalance) <= getNumberValue(goalAmount)
  ? currency(userSettings.remainingBalance)
  : currency(userSettings.remainingBalance).add(userSettings.emrCommitmentAmount)
}

export function calculateEmrGoalAmount({averagePayPerPeriod, numberOfPayPeriodPerMonth, emrtype}) {
  return currency(numberOfPayPeriodPerMonth).multiply(emrtype).multiply(averagePayPerPeriod)
}
export function calculateBudget(emrSettings, spendingTransactions = [], fixedSpendings = [], goals = [], pay = 0, health = 0) {


  let totalBudgetBeforeTransactions = currency(pay)
    .subtract(calculateTotalAmount(fixedSpendings))
    .subtract(calculateTotalAmount(goals))
    .format()

  if(isEmrGoalReached(emrSettings)) {
    totalBudgetBeforeTransactions = currency(totalBudgetBeforeTransactions).subtract(emrSettings.commitmentAmount).format()
  }

  const totalTransactionAmount = currency(calculateTotalAmount(spendingTransactions)).format()

  const totalBudgetAfterSpending = currency(totalBudgetBeforeTransactions)
    .subtract(totalTransactionAmount)
    .format()
  

  return [totalBudgetBeforeTransactions, totalBudgetAfterSpending, totalTransactionAmount]
  
}

export function getEmrStats(emrSettings, spendingTransactions = [], fixedSpendings = [], goals = [], pay = 0, health = 0) {


  const emrGoalAmount = calculateEmrGoalAmount(emrSettings).format()
  const emrStatus = calculateEmrStatus(emrSettings).format()
  

  return {emrGoalAmount, emrStatus}
  
}

export function format(value) { return currency(value).format()}