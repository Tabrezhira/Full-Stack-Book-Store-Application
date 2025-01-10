import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'


function Favourites() {
  const [FavBook, setFavBooks]=useState()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
   }
  useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v3/get-favourite-books",{headers})
      setFavBooks(response.data.data)
    }
    fetch()
  },[FavBook])
  return (
    <>
      {FavBook && FavBook.length === 0 && (
      <div className='text-5xl font-semibold text-zinc-500 flex items-center justify-center flex-col w-full h-[100%]'>
        No Favorite Books
        <img src="./public/star.png" alt='star' className='h-[20vh] my-8'/>
      </div>
    )}

    <div className='grid grid-cols-4 gap-4'>
    {FavBook && FavBook.map((items,i) => <div key={i}><BookCard data={items} favorites={true}/></div>)}
    </div>
    
    </>

  )
}

export default Favourites
