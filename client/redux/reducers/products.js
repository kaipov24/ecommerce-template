const GET_PRODUCTS = '@@GET_PRODUCTS'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION'
const GET_RATES = '@@GET_RATES'
const SET_BASE = 'SET_BASE'
const SORTING = 'SORTING'
const GET_LOGS = '@@GET_LOGS'

const initialState = {
  list: [],
  selection: {},
  rates: {},
  basket: [],
  logs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_SELECTION:
      return {
        ...state,
        basket: {
          ...state.basket,
          [action.id]: action.basket
        },
        selection: {
          ...state.selection,
          [action.id]: (state.selection[action.id] || 0) + 1
        }
      }

    case REMOVE_FROM_SELECTION: {
      const newSelection = {
        ...state.selection,
        [action.id]: state.selection[action.id] - 1
      }
      const newBasketItem = {
        ...state.basket,
        [action.id]: action.basket
      }
      if (newSelection[action.id] <= 0 || newBasketItem[action.id] <= 0) {
        delete newBasketItem[action.id]
        delete newSelection[action.id]
      }
      return {
        ...state,
        selection: newSelection,
        basket: newBasketItem
      }
    }

    case SET_BASE:
      return { ...state, base: action.base }

    case GET_RATES:
      return { ...state, ...action.rates }

    case GET_PRODUCTS:
      return { ...state, list: action.list }

    case SORTING:
      return { ...state, sort: action.sort }

    case GET_LOGS:
      return { ...state, logs: action.logs }

    default:
      return state
  }
}

export function sorting(sort) {
  return { type: SORTING, sort }
}

export function addSelection(id, item) {
  return { type: ADD_TO_SELECTION, id, basket: item }
}

export function removeSelection(id, item) {
  return { type: REMOVE_FROM_SELECTION, id, basket: item }
}

export function setBase(base) {
  return { type: SET_BASE , base }
}

export function getLogs() {
  return (dispatch) => {
    fetch('/api/v1/logs')
      .then((res) => res.json())
      .then((logs) => {
        dispatch({ type: GET_LOGS, logs })
      })
  }
}

export function getRates() {
  return (dispatch) => {
    fetch('/api/v1/rates')
      .then((res) => res.json())
      .then((rates) => {
        dispatch({ type: GET_RATES, rates })
      })
  }
}
export function getProducts() {
  return (dispatch) => {
    fetch('/api/v1/products')
      .then((res) => res.json())
      .then((list) => {
        dispatch({ type: GET_PRODUCTS, list })
      })
  }
}
