import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

const Navbar = () => {
  return (
    <div className='Nav'>
      <span>Book Store</span>
      <ul>
        <li><Link to='/books'>Books</Link></li>
        <li><Link to='/admin'>Admin</Link></li>
      </ul>
    </div>
  )
}

export default Navbar
