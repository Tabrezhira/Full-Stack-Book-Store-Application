import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
const ViewBookDetails = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [Data, setData] = useState();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const role = useSelector((state) => state.auth.role)
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid:id
     }

    useEffect(() => {
        const fetch = async () => {
           const response = await axios.get(`http://localhost:1000/api/v2/get-books-id/${id}`)
          //  console.log(response.data.data)
            setData(response.data.data)
        }
        fetch()
    }, [])
    const handleFavourite = async() =>{
      const response = await axios.put(`http://localhost:1000/api/v3/add-book-to-favuraite`,{},{headers})
      alert(response.data.message)
    }
    const handleCart = async() =>{
      const response = await axios.put(`http://localhost:1000/api/v3/add-book-to-cart`,{},{headers})
      alert(response.data.message)
    }
    const deleteBook = async() => {
      const res = await axios.delete("http://localhost:1000/api/v2/delete-book",{headers})
      alert(res.data.message)
      navigate('/all-books')
    }
  return (
    <>
    {Data && (
          <div className='px-4 md:px-12 py-8 bg-zinc-900 flex gap-8 flex-col lg:flex-row'>
          <div className='  text-white  w-full lg:w-3/6  '>
          <div className='flex flex-col lg:flex-row  justify-around rounded  p-12 bg-zinc-800'>
              <img src={Data.url} alt="/" className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded ' />
            {isLoggedIn === true && role === "user" && (
             <div className='flex flex-col md:flex-row lg:flex-col mt-0 items-center justify-between lg:justify-start lg:mt-0'>
                <button onClick={handleFavourite} className='bg-white rounded lg:rounded-full text-black text-3xl p-3 mt-4 text-red-500 flex items-center justify-center'>
                  <FaHeart /> <span className='ms-4 block lg:hidden'>Favourites</span>
                  </button>
                <button onClick={handleCart} className='text-white md:mt-0 rounded lg:rounded-full  text-black text-3xl p-3 mt-8 lg:mt-8 bg-blue-500 flex items-center justify-center'>
                  <FaShoppingCart /> <span className='ms-4 block lg:hidden'>Add to cart</span>
                  </button>
              </div>
            )}{isLoggedIn === true && role === "admin" && (
              <div className='flex flex-col md:flex-row lg:flex-col mt-0 items-center justify-between lg:justify-start lg:mt-0'>
                 <Link to={`/updateBook/${id}`} className='bg-white rounded lg:rounded-full text-black text-3xl p-3 mt-4 text-green-500 flex items-center justify-center'>
                 <FaEdit /> <span className='ms-4 block lg:hidden'>Edit Books</span>
                   </Link>
                 <button className='text-red-500 rounded lg:rounded-full  text-black text-3xl p-3 mt-4 lg:mt-8 md:mt-0 bg-white flex items-center justify-center' onClick={deleteBook}>
                 <MdOutlineDelete /> <span className='ms-4 block lg:hidden'>Delete Book</span>
                   </button>
               </div>
             )}
          </div>
          </div>
          <div className='p-4 w-full lg:w-3/6'>
          <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
          <p className='text-zinc-400 mt-1'>{Data.author}</p>
          <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
          <p className=' flex mt-4 items-center justify-start text-zinc-400'>
            <GrLanguage className=" me-3"/>
            {Data.language}
          </p>
          <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price: $ {Data.price}{" "}</p>
          </div>
      </div>
    )}{!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader/></div>}
    </>

  )
}

export default ViewBookDetails