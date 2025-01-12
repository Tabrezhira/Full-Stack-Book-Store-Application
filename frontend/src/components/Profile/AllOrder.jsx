import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import SeeUserData from "./SeeUserData";

function AllOrder() {
  const [AllOrders, setAllOrders] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v3/get-all-orders",
        { headers }
      );
      setAllOrders(res.data.data);
    };
    fetch();
  }, []);



  return (
    <>
      {!AllOrders && (<div className="h-[100%] flex items-center justify-center">
      <Loader/>  
      </div>)}

      {AllOrder && AllOrder.length > 0 && <>
        
      </>}
    </>
  );
};

export default AllOrder