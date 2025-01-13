import React from "react";
import { RxCross1 } from "react-icons/rx";
const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <>
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80  text-black`}
      ></div>{" "}
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center text-black`}
      >
        <div className="bg-white rounded p-4 w[80%] md:w-[50%] lg:w-[40%]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-black font-semibold">User Information</h1>
            <button onClick={() => setuserDiv("hidden")}>
              <RxCross1 />
            </button>
          </div>
          <div className="mt-2 text-black">
            <label htmlFor="">
              Username :{" "}
              <span className=" text-black font-semibold">{userDivData.username}</span>
            </label>
          </div>
          <div className="mt-4 text-black">
            <label htmlFor="">
              Email : <span className="text-black font-semibold">{userDivData.email}</span>
            </label>
          </div>
          <div className="mt-4 text-black">
            <label htmlFor="">
              Address :{" "}
              <span className=" text-black font-semibold">{userDivData.address}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
