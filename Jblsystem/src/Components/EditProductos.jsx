import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


export const EditProductos = () => {
    const {id} = useParams()
    const [product, setProduct] = useState({
        producto: "",
        category_id: "",
        descripcion: "",
        precio: "",
        stock: "",
    });

    const [category, setCategory] = useState([])
    const navigate = useNavigate()

    useEffect(()=> {
        axios.get('http://localhost:8081/auth/categorias')
        .then(result => {
          if(result.data.Status) {
            setCategory(result.data.Result);
          }else{
            alert(result.data.Error)
          }
        }).catch(err => console.log(err))

        axios.get('http://localhost:8081/auth/productos/'+id)
        .then(result => {
            setProduct({
                ...product,
                producto: result.data.Result[0].producto,
                category_id: result.data.Result[0].category_id,
                descripcion: result.data.Result[0].descripcion,
                precio: result.data.Result[0].precio,
                stock: result.data.Result[0].stock,
            })
        }).catch(err => console.log(err))
      }, [])

      const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:8081/auth/edit_productos/'+id, product)
        .then(result => {
            if(result.data.Status) {
                navigate('/productos')
            } else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
      }

  return (
    <div>
        <Navbar />
        <div className='d-flex justify-content-center align-items-center mt-3'>
        <div className='p-3 rounded w-50 border'>
                <h2 className='text-center'>Editar Productos</h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                <div className='col-12'>  
                    <label for='inputName' className='form-label'>Producto:</label>
                    <input
                        type="text"
                        className='form-control rounded-0'
                        id="inputName"
                        placeholder='Enter Product'
                        value={product.producto}
                        onChange={(e) => setProduct({...product, producto: e.target.value})}
                    />
                </div>
                <div className='col-12'>  
                    <label for='inputCate' className='form-label'>Categoria:</label>
                    <select name='category' id='category' className='form-select'
                    onChange={(e) => setProduct({...product, category_id: e.target.value})}                                            >
                        {category.map(c => {
                            return <option value={c.id}>{c.name}</option>
                        })}
                    </select>
                </div>
                <div className='col-12'>  
                    <label for='inputDes' className='form-label'>Descripcion:</label>
                    <input
                        type="text"
                        className='form-control rounded-0'
                        id="inputDes"
                        placeholder='Enter Descripcion'
                        value={product.descripcion}
                        onChange={(e) => setProduct({...product, descripcion: e.target.value})}
                    />
                </div>
                <div className='col-12'>  
                    <label for='inputPre' className='form-label'>Precio:</label>
                    <input
                        type="text"
                        className='form-control rounded-0'
                        id="inputPre"
                        placeholder='Enter Precio'
                        value={product.precio}
                        onChange={(e) => setProduct({...product, precio: e.target.value})}
                    />
                </div>
                <div className='col-12'>  
                    <label for='inputSto' className='form-label'>Stock:</label>
                    <input
                        type="text"
                        className='form-control rounded-0'
                        id="inputSto"
                        placeholder='Enter Stock'
                        value={product.stock}
                        onChange={(e) => setProduct({...product, stock: e.target.value})}
                    />
                </div>
                
                <div className='col-12'>
                    <button type='submit' className='btn btn-primary w-100'>Modificar</button>
                </div>
        </form>
    </div>
    </div>
    </div>
  )
}
