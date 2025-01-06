import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/all-books' element={<AllBooks/>} />
          <Route exact path='/LogIn' element={<Login/>} />
          <Route exact path='/Signup' element={<Signup/>} />
          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/profile' element={<Profile/>} />
        </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App