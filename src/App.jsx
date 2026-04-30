import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Carrinho from './pages/Carrinho'
import ProdutoDetalhe from './pages/ProdutoDetalhes'
import Cadastro from './pages/Cadastro'
import { BrowserRouter, NavLink,Route,Routes } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";

import 'primeicons/primeicons.css';
        

export default function App() {

  return (
    
    <>
    <BrowserRouter>
        <nav className="navbar">
          <NavLink to='/' className="nav-link"><h2 style={{fontWeight: 'bold'}}>LiarShop</h2></NavLink>
          <NavLink to='/login' className="nav-link">Login</NavLink>
          <NavLink to='/Dashboard' className="nav-link">Dash</NavLink>
          <NavLink to='/cadastro' className="nav-link">Cadastro</NavLink>
          <NavLink to='/carrinho' className="nav-link"><i className="pi pi-shopping-cart" style={{fontSize:'1.5rem'}}></i></NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/ProdutoDetalhes/:id' element={<ProdutoDetalhe/>}/>
          <Route path='/carrinho' element={<Carrinho/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/cadastro' element={<Cadastro/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}


