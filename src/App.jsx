import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Carrinho from './pages/Carrinho'
import ProdutoDetalhe from './pages/ProdutoDetalhes'
import { BrowserRouter, NavLink,Route,Routes } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";

export default function App() {

  return (
    
    <>
    <BrowserRouter>
        <nav className="navbar">
          <NavLink to='/' className="nav-link">Home</NavLink>
          <NavLink to='/login' className="nav-link">Login</NavLink>
          <NavLink to='/Dashboard' className="nav-link">Dash</NavLink>
          <NavLink to='/carrinho' className="nav-link">🛒</NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/ProdutoDetalhes/:id' element={<ProdutoDetalhe/>}/>
          <Route path='/carrinho' element={<Carrinho/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}


