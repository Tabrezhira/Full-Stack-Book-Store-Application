import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submit = async() => {
    try {
      if( Data.email === '' || Data.password === '' ){
        alert("All fields are required")
      }else{
        const response = await axios.post("http://localhost:1000/api/v1/sign-in",Data)
        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))
        localStorage.setItem("id",response.data.id)
        localStorage.setItem("role",response.data.role)
        localStorage.setItem("token",response.data.token)
        navigate('/profile')
        setData({
          email: "",
          password: "",
        })

      }

    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Login</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Email"
              name="email"
              required
              value={Data.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
              placeholder="password"
              name="password"
              required
              value={Data.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
              onClick={submit}
            >
              LogIn
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Don't have an account? &nbsp;
            <Link to="/signup" className="hover:text-blue-500">
              <u>Sign Up</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
