import { useFormik } from "formik";
import MovieHolder from "../../components/MovieHolder";
import React, { useEffect, useRef, useState } from "react";
import useDrag from "../../hooks/useDrag";
import { btnClassName, btnClassName2 } from "../../utils/css";
import { useDispatch, useSelector } from "react-redux";
import useFetchData from "../../hooks/useFetch";
import { toast } from "sonner";
import Loading from "../../components/helper";
import { login, logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import ProfileMovies from "./ProfileMovies";
import ProfileOverView from "./ProfileOverView";
import useFetchData2 from "../../hooks/useFetch2.0";



function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutFunc = () => {
    dispatch(logout());
    navigate("/");
  };
  const {fetchData2, error}=useFetchData2()
  useEffect(()=>{
    const fetch=async()=>{

      console.log('re')
      const res=await fetchData2('get','/api/lists/watchlist/l/protected')
      console.log(res)
      
    }
    fetch()
  },[])
  console.log("profile page re render");
  return (
    <div className=" bg-main px-20 relative">
      <div className="bg-gray-500 h-52 inset-0 absolute w-full z-0"></div>
      <ProfileOverView />
      <ProfileMovies />

      <div className="w-full flex md:justify-evenly flex-col md:flex-row items-center gap-4 shadow-2xl border-accent border-2 p-4">
        <button className={btnClassName}>Change Password</button>
        <button className={btnClassName2}>Delete Account</button>
        <button onClick={logoutFunc} className={btnClassName}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
