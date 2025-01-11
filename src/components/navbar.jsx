import React from 'react'

const navbar = () => {
  return (
    <nav className='flex w-[100vw]  justify-between bg-slate-700 text-white' >
        <img width={45}  src="img/log.jpeg" alt="" />
        
        <ul className="flex gap-8 mx-8 py-3">
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Your Task</li>
        </ul>
    </nav>
  )
}

export default navbar
