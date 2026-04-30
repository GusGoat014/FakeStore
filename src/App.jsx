import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Carrinho from './pages/Carrinho'
import ProdutoDetalhe from './pages/ProdutoDetalhes'
import Cadastro from './pages/Cadastro'
import { BrowserRouter, NavLink,Route,Routes, useNavigate } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './COMPONENTS/PrivateRoute'
import { useEffect, useState } from 'react';

import 'primeicons/primeicons.css';
        

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize localStorage with users if not present
    if (!localStorage.getItem('users')) {
      const initialUsers = [
        {
          nome: 'admin',
          senha: 'admin',
          preferredProducts: [1, 2],
          role: 'admin'
        },
        {
          nome: 'user',
          senha: 'user',
          preferredProducts: [1, 2, 3, 4, 5],
          role: 'user'
        }
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    
    <>
        <nav className="navbar">
          <NavLink to='/' className="nav-link"><h2 style={{fontWeight: 'bold'}}>LiarShop</h2></NavLink>
          {currentUser && (
            <NavLink to='/Dashboard' className="nav-link">Dash</NavLink>
          )}
          {!currentUser ? (
            <>
              <NavLink to='/login' className="nav-link">Login</NavLink>
              <NavLink to='/cadastro' className="nav-link">Cadastro</NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-btn">Sair</button>
          )}
          <NavLink to='/carrinho' className="nav-link"><i className="pi pi-shopping-cart" style={{fontSize:'1.5rem'}}></i></NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login setCurrentUser={setCurrentUser} />}/>
          <Route path='/ProdutoDetalhes/:id' element={<ProdutoDetalhe/>}/>
          <Route path='/carrinho' element={<Carrinho/>}/>
          <Route path='/Dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path='/cadastro' element={<Cadastro/>}/>
        </Routes>
      </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


