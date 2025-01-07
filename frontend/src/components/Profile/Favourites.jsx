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
  },[])
  return (
    <div className='grid grid-cols-4 gap-4'>
     {FavBook && FavBook.map((items,i) => <div key={i}><BookCard data={items}/></div>)}
    </div>
  )
}

export default Favourites
