import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSelection, removeSelection } from '../redux/reducers/products'

const Cards = () => {
  const dispatch = useDispatch()
  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const sort = useSelector((s) => s.products.sort)
  const rates = useSelector((s) => s.products.rates)
  const symbols = {
    USD: '$',
    EUR: 'E',
    CAD: 'C'
  }

  function preSort(arr, sortBy) {
    if (sortBy === 'title') {
      return arr.sort(function alphabet(a, b) {
        const nameA = a.title.toUpperCase()
        const nameB = b.title.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
    }
    return arr.sort(function numeric(a, b) {
      if (sortBy === 'price') {
        return b.price - a.price
      }
      return a.price - b.price
    })
  }
  return (
    <div className="flex flex-wrap content-center justify-center card">
      {preSort(list, sort).map((card) => {
        return (
          <div
            className="max-w-sm bg-indigo-100 rounded overflow-hidden shadow-lg w-64 p-2 m-4"
            key={card.id}
          >
            <div className="flex justify-center">
              <img className="h-32 card__image" src={card.image} alt={card.title} />
            </div>
            <div className="flex justify-center inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 card__title">
              {card.title}{' '}
            </div>
            <div className="flex justify-center">
              <div className="w-30 shadow bg-purple-500 text-white font-bold py-2 px-4 rounded card__price">
                {(card.price * (rates[base] || 1)).toFixed(2)} {symbols[base]}{' '}
              </div>
            </div>
            <div className="flex p-10 justify-between">
              {' '}
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="button"
                onClick={() => {
                  dispatch(removeSelection(card.id, card))
                }}
              >
                -
              </button>
              <div className="card__product-amount">{selection[card.id] || ' '}</div>
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="button"
                onClick={() => {
                  dispatch(addSelection(card.id, card))
                }}
              >
                +{' '}
              </button>{' '}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cards
