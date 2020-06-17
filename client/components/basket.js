import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from './header'
import Basket from './basket-products'

import { getProducts, getRates } from '../redux/reducers/products'

// import wave from '../assets/images/wave.jpg'

const BasketList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getRates())
  }, [])

  return (
    <div>
      <Header />
      <Basket />
    </div>
  )
}

BasketList.propTypes = {}

export default BasketList
