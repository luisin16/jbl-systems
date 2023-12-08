import './style.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'

const Productos = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate()

  useEffect (() => {
    axios.get('http://localhost:8081/auth/productos')
      .then(result => {
        if (result.data.Status) {
          setProduct(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, [])
  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/auth/delete_productos/'+id)
    .then(result => {
      if(result.data.Status){
        window.location.reload()
      } else {
        alert(result.data.Error)
      }
    })
  }
  return (
    <div>
      <Navbar />
      <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
          <h3>Productos</h3>
        </div>
        <Link to="/add_productos" className='btn btn-success'>Agregar Productos</Link>
        <div className='mt-3'>
          <table className='table'>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoria</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Imagen</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                product.map(e => (
                  <tr>
                    <td>{e.producto}</td>
                    <td>{e.category_id}</td>
                    <td>{e.descripcion}</td>
                    <td>{e.precio}</td>
                    <td>{e.stock}</td>
                    <td><img src={`http://localhost:8081/Images/`+e.image} className='product_image' /></td>
                    <td>
                      <Link to={`/edit_productos/`+e.id} className='btn btn-info btn-sm me-2'>Editar</Link>
                      <Link className='btn btn-warning btn-sm' onClick={() => handleDelete(e.id)}>Eliminar</Link>
                    </td>
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

export default Productos