

const Input = ({placeholder,type, value,onChange}) => {

  return (
    <input className='p-1 text-xl focus:outline-none border border-gray-200 rounded-xl p-2 w-90 focus:border-blue-300  bg-gradient-to-tr from-gray-300 via-white-300 to-purple-200 shadow-purple-900/60'
     type={type} placeholder={placeholder} value={value} onChange={onChange} />
  )
}

export default Input