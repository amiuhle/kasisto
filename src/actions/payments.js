export const SET_AMOUNT = 'SET_AMOUNT'
export const SET_RECEIPT = 'SET_RECEIPT'
export const SET_TIP = 'SET_TIP'

export const setAmount = amount =>
  ({ type: SET_AMOUNT, amount })

export const setReceipt = receipt =>
  ({ type: SET_RECEIPT, receipt })

export const setTip = tip =>
  ({ type: SET_TIP, tip })
