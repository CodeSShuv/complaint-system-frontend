import React from 'react'

const Button = ({event= ()=>{}, text}) => {
  return (
    <button className='bg-purple-600 px-6 py-3 w-30 h-13 rounded-3xl text-lg shadow-md shadow-purple-600/50 active:translate-y-1 transition-all hover:shadow-xl opacity-80 text-white font-semibold'   onClick={event}>{text}</button>
  )
}

export default Button