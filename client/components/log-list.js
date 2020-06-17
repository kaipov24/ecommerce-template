import React from 'react'
import { useSelector } from 'react-redux'

const Logs = () => {
  const logs = useSelector((s) => s.products.logs)

  const actions = logs.reduce((acc, rec) => {
    if (rec.type.indexOf('@@') <= -1) {
      return [...acc, ...rec]
    }
    return acc
  }, [])

  // const currActions = actions.reduce((acc, rec) => {
  //   if (rec.type === 'SET_BASE') {
  //     return [...acc, ...rec]
  //   }
  //   return acc
  // }, [])

  return (
    <div>
      {actions.map((log) => {
        switch (log.type) {
          case 'ADD_TO_SELECTION': {
            return (
              <div className="w-1/4 bg-green-300 h-auto rounded-lg p-3 m-5">
                add {log.basket.title} to the backet
                <div>time of action: {log.date}</div>
              </div>
            )
          }
          case 'REMOVE_FROM_SELECTION': {
            return (
              <div className="w-1/4 bg-red-300 h-auto rounded-lg p-3 m-5">
                remove {log.basket.title} from the backet
                <div>time of action: {log.date}</div>
              </div>
            )
          }
          case 'SORTING': {
            return (
              <div className="w-1/4 bg-indigo-300 h-auto rounded-lg p-3 m-5">
                sort by {log.sort}
                <div>time of action: {log.date}</div>
              </div>
            )
          }
          case 'SET_BASE': {
            return (
              <div className="w-1/4 bg-indigo-300 h-auto rounded-lg p-3 m-5">
                to {log.base}
                <div>time of action: {log.date}</div>
              </div>
            )
          }

          default:
            return ' '
        }
      })}
    </div>
  )
}

export default Logs
