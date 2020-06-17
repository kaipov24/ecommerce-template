import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setBase, sorting } from '../redux/reducers/products'

const Header = () => {
  const dispatch = useDispatch()
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const sort = useSelector((s) => s.products.sort)
  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const getPrice = (id) => list.find((it) => it.id === id).price
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)
  const sum = Object.entries(selection)
    .reduce((acc, [id, qty]) => acc + getPrice(id) * qty * (rates[base] || 1), 0)
    .toFixed(2)

  return (
    <div className="flex flex-wrap justify-around w-full lg:max-w-full lg:flex bg-indigo-300 p-3">
      <div>
        {['CAD', 'USD', 'EUR'].map((it) => {
          return (
            <button
              key={it}
              type="button"
              className={`mx-4 bg-gray-700 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg ${
                base === it ? 'underline' : ''
              }`}
              onClick={() => {
                dispatch(setBase(it))
              }}
            >
              {it}
            </button>
          )
        })}
      </div>
      <div>
        <button
          type="button"
          id="sort-price"
          className={`mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${
            sort === 'price' ? 'underline' : ''
          }`}
          onClick={() => {
            dispatch(sorting('price'))
          }}
        >
          Sort by price
        </button>
        <button
          type="button"
          id="sort-name"
          className={`mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${
            sort === 'title' ? 'underline' : ''
          }`}
          onClick={() => {
            dispatch(sorting('title'))
          }}
        >
          Sort by title
        </button>
      </div>
      <div>
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 pt-2">
          Sum:{sum !== 0 && sum}
        </div>
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 pt-2">
          Items:{numberOfItems !== 0 && numberOfItems}
        </div>
      </div>
      <div>
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 pt-2">
          <Link to="/basket" id="order-count">
            Basket
          </Link>
        </div>
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 pt-2">
          <Link to="/" id="brand-name">
            Main
          </Link>
        </div>
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 pt-2">
          <Link to="/logs" id="brand-name">
            Logs
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
