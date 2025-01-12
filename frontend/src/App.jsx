import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import {  Routes, Route  } from 'react-router-dom'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/Profile/Favourites'
import OrderHistory from './components/Profile/OrderHistory'
import Settings from './components/Profile/Settings'
import AllOrder from './components/Profile/AllOrder'
import Addbook from './pages/Addbook'
import Updatebook from './pages/Updatebook'

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  })

  return (
    <>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/all-books' element={<AllBooks/>} />
          <Route exact path='/updateBook/:id' element={<Updatebook/>} />
          <Route exact path='/LogIn' element={<Login/>} />
          <Route exact path='/Signup' element={<Signup/>} />
          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/profile' element={<Profile/>}>
          {role === 'user' ? <Route index element={<Favourites/>}/> : <Route index element={<AllOrder/>}/>}
          {role === "admin" && <Route path="/profile/add-book" element={<Addbook/>}/> }
          <Route path="/profile/orderHistory" element={<OrderHistory/>}/>
          <Route path="/profile/Settings" element={<Settings/>}/>
          </Route>
          <Route exact path='/view-book-details/:id' element={<ViewBookDetails/>} />
        </Routes>
      <Footer/>
    </>
  )
}

export default App
