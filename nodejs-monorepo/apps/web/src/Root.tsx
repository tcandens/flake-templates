import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import clsx from 'clsx'

function Root() {
  return (
    <div>
      <nav className="absolute bottom-0 left-0 w-full p-2 bg-slate-800 text-slate-100">
        <NavLink to="/">Home</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default Root
