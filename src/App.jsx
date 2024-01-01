import React from 'react'
import './index.css'

const App = () => {
  return (
    <>
    <div id='main-bg' className='flex h-screen justify-center items-center bg-slate-400'>
      <button id='btn-bg' className='text-4xl rounded-lg bg-green-500 px-20 py-8 font-semibold text-white shadow-xl hover:shadow-2xl duration-100'>Take Quiz</button>
    </div>
    </>
  )
}

export default App