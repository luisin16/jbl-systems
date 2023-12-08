import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

export const Users = () => {
  return (
    <div>
        <Navbar />
        <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
          <h3>Usuarios</h3>
        </div>
        <Link to="/add_users" className='btn btn-success'>Agregar Usuarios</Link>
      </div>
    </div>
  )
}
