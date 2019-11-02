const initialState = {
  balance: 0
}

function deepCopy(x) {
  return JSON.parse(JSON.stringify(x))
}

const todoReducer = (state, action) => {
  // console.log('Inside reducer')
  // console.log('State', state)
  // console.log('Action', action)
  console.log('Here is the action:', action)
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

  // birth a new object so we don't mutate our state accidentally
  // try to keep todoReducer a "pure function"
  // let newState = Object.assign({}, state)

  let newState

  if (state === undefined) {
    newState = deepCopy(initialState)
  } else {
    newState = deepCopy(state)
  }
  
  if (action.type === 'ADD_1') {
    newState.balance = newState.balance + 1
  } else if (action.type === 'REMOVE_1') {
    newState.balance = newState.balance - 1
  } else if (action.type === 'ADD') {
    newState.balance = newState.balance + action.amount
  }
  // for all other actions
  return newState
}

const store = Redux.createStore(todoReducer)

function addOneToBalance() {
  store.dispatch({
    type: 'ADD_1'
  })
}

function removeOneFromBalance() {
  store.dispatch({
    type: 'REMOVE_1'
  })
}

function addMore() {
  let amount = window.prompt('How much?')
  amount = parseInt(amount, 10)
  if (typeof amount === 'number' && amount >= 0) {
    store.dispatch({
      type: 'ADD',
      amount: amount
    })
  }
}

function render(state) {
  let rootEl = document.getElementById('root')
  let html = `
    <h1>Balance: ${state.balance}</h1>
    <button onclick="addOneToBalance()">Add One</button>
    <button onclick="removeOneFromBalance()">Remove One</button>
    <button onclick="addMore()">Add more</button>
  `
  rootEl.innerHTML = html
}

store.subscribe(() => {
  // console.log('Subscribe', store.getState())
  render(store.getState())
})

render(store.getState())