import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Categorias = () => {
  const [category, setCategory] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:8081/auth/categorias')
    .then(result => {
      if(result.data.Status) {
        setCategory(result.data.Result);
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }, [])

  return (
    <div> 
        <Navbar/>
        <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Categorias</h3>
        </div>
        <Link to="/add_category" className='btn btn-success'>Agregar Categoria</Link>
        <div className='mt-3'>
          <table className='table'>
            <thead>
              <tr>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {
                category.map(c => (
                  <tr>
                    <td>{c.name}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        </div>
    </div>
  )
}

export default Categorias