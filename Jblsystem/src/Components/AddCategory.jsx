import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const AddCategory = () => {
    const [category, setCategory] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/auth/add_category', {category})
        .then(result => {
          if(result.data.Status) {
              navigate('/categorias')
          }else{
            alert(result.data.Error)
          }
        })
        .catch(err => console.log(err))
    }
  return (
    <div><Navbar />
    <div className='d-flex justify-content-center align-items-center vh-95'>
    <div className='p-3 rounded w-25 border'>
        <h2>Añadir Categoria</h2>
        <form onSubmit={handleSubmit}>
        <div className='mb-3'>  
                <label htmlFor="category"><strong>Categoria: </strong></label>
                <input type="text" placeholder='Enter category' name='category' 
                  onChange={e => setCategory(e.target.value)} className='form-control rounded-0'/>
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Añadir</button>
        </form>
    </div>
    </div>
</div>
  )
}

export default AddCategory