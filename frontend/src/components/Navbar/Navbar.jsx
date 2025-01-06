import React from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
import { useState } from 'react';

function Navbar() {
    const links = [
        {
            title:"Home",
            link:'/',
        }, 
        {
            title:"All Books",
            link:'/all-books',
        },
        {
            title:"Cart",
            link:'/cart',
        },
        {
            title:"Profile",
            link:'/profile',
        },

    ]
    const [MobileNav, setMobileNav] = useState("hidden")
  return (
    <>
    <nav className=' z-50 relative bg-zinc-800 text-white px-8 py-4 flex items-center justify-between'>
      <Link to='/' className=' flex items-center'>
        <img className='h-10 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo"  />
            <h1 className='text-2xl font-semibold'> BookHeaven </h1>
        </Link>
      <div className=" nav-links-bookheavens block md:flex items-center gap-4">
        <div className='hidden md:flex gap-4'>
         {links.map((items,i)=>(<Link to={items.link} className=' hover:text-blue-500 transition-all duration-300 cursor-pointer' key={i}>{items.title}</Link>))}
        </div>
        <div className="hidden md:flex gap-4">
            <Link to='/LogIn' className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' >LogIn</Link>
            <Link to='/Signup'className='px-2 py-1 border bg-blue-500 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
        </div>
        <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={()=>(MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}><FaGripLines /></button>
   
      </div>
    </nav>
    <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((items,i)=>(<Link to={items.link} className={`${MobileNav} text-white mb-8 text-4xl font-semibold hover:text-blue-500 transition-all duration-300 cursor-pointer`} key={i} onClick={()=>(MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>{items.title}</Link>))}
            <Link to='/LogIn' className={`${MobileNav} px-8  mb-8 py-2 text-3xl text-white font-semibold border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`} >LogIn</Link>
            <Link to='/Signup'className={`${MobileNav} px-8 mb-8 py-2 text-3xl  text-white font-semibold border bg-blue-500 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
    </div>
    </>

  )
}

export default Navbar
