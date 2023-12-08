import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

export const AddProductos = () => {
    const [product, setProduct] = useState({
        producto: "",
        category_id: "",
        descripcion: "",
        precio: "",
        stock: "",
        image: "",
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
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('producto', product.producto);
        formData.append('category_id', product.category_id);
        formData.append('descripcion', product.descripcion);
        formData.append('precio', product.precio);
        formData.append('stock', product.stock);
        formData.append('image', product.image);

        axios.post('http://localhost:8081/auth/add_productos', formData)
        .then(result => {
            if(result.data.Status) {
                navigate('/productos')
            }else{
              alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    } 

  return (
    <div>
        <Navbar />
        <div className='d-flex justify-content-center align-items-center mt-3'>
    <       div className='p-3 rounded w-50 border'>
                <h2 className='text-center'>Añadir Productos</h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                <div className='col-12'>  
                    <label for='inputName' className='form-label'>Producto:</label>
                    <input
                        type="text"
                        className='form-control rounded-0'
                        id="inputName"
                        placeholder='Enter Product'
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
                        onChange={(e) => setProduct({...product, stock: e.target.value})}
                    />
                </div>
                <div className='col-12 mb-3'>  
                    <label className='form-label' for='inputGroupFile'>Subir Imagen:</label>
                    <input
                        type="file"
                        className='form-control rounded-0'
                        id="inputGroupFile"
                        name="image"
                        onChange={(e) => setProduct({...product, image: e.target.files[0]})}
                    />
                </div>
                <div className='col-12'>
                    <button type='submit' className='btn btn-primary w-100'>Agregar</button>
                </div>
        </form>
    </div>
    </div>
    </div>
  );
};
