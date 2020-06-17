import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from './header'
import Logs from './log-list'

import { getProducts, getLogs } from '../redux/reducers/products'

// import wave from '../assets/images/wave.jpg'

const Actions = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getLogs())
  }, [])

  return (
    <div>
      <Header />
      <Logs />
    </div>
  )
}

Actions.propTypes = {}

export default Actions
