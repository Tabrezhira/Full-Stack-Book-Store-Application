import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import Mobilenav from '../components/Profile/Mobilenav'

const Profile = () => {
//  const isloggedIn = useSelector()
 const [Profile, setProfile] = useState()
 const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
 }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-information",{headers})
      setProfile(response.data)
   
    }
    fetch()
  },[])
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white'>
    {!Profile && <div className='w-full h-[100%] flex items-center justify-center'><Loader/></div> }
    {Profile && ( <>
      <div className="w-full h-auto  lg:h-screen  md:w-1/6">
      <Sidebar data={Profile}/>
      <Mobilenav/>
      </div>
      <div className="w-5/6"><Outlet/></div>
    </>)}
    </div>
  )
}

export default Profile
