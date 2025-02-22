import React from 'react'
import Navbar from '../shared/Navbar/Navbar'

export default function Authenticationlayout( {children}) {
  return (
    <div>
    <Navbar/>
    {children}
    </div>
  )
}
