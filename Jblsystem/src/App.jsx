import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import { Dashboard } from './Components/Dashboard'
import About from './Components/About'
import Contacto from './Components/Contacto'
import Registrarse from './Components/Registrarse'
import Categorias from './Components/Categorias'
import AddCategory from './Components/AddCategory'
import Productos from './Components/Productos'
import { AddProductos } from './Components/AddProductos'
import { EditProductos } from './Components/EditProductos'
import Start from './Components/Start'
import UsersLogin from './Components/UsersLogin'
import { PrivateRoute } from './Components/PrivateRoute'
import { Users } from './Components/Users'
import AddUsers from './Components/AddUsers'

function App() {
  return (
    <div>
        <div className="header">
          <h1>JBL Systems</h1>
        </div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start/>}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/users_login' element={<UsersLogin />}></Route>
      <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
      <Route path='/categorias' element={<Categorias />}></Route> 
      <Route path='/productos' element={<Productos />}></Route>
      <Route path='/users' element={<Users />}></Route>      
      <Route path='/about' element={<About />}></Route>
      <Route path='/contacto' element={<Contacto />}></Route>
      <Route path='/registrarse' element={<Registrarse />}></Route>
      <Route path='/add_category' element={<AddCategory />}></Route>
      <Route path='/add_productos' element={<AddProductos />}></Route>
      <Route path='/add_users' element={<AddUsers />}></Route>
      <Route path='/edit_productos/:id' element={<EditProductos />}></Route>
    </Routes>
    </BrowserRouter> 
    </div> 
    
  )
}

export default App
