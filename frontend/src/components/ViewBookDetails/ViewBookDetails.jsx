import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
const ViewBookDetails = () => {
    const {id} = useParams()
    const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
           const response = await axios.get(`http://localhost:1000/api/v2/get-books-id/${id}`)
          //  console.log(response.data.data)
            setData(response.data.data)
        }
        fetch()
    }, [])
    console.log(Data)
  return (
    <>
    {Data && (
          <div className='px-4 md:px-12 py-8 bg-zinc-900 flex gap-8 flex-col md:flex-row'>
          <div className='bg-zinc-800 rounded p-4 text-white h-[70vh] lg:h-[88vh] w-full lg:w-3/6  flex items-center justify-center'>
          <img src={Data.url} alt="/" className='h-[50vh] lg:h-[70vh] rounded' />
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