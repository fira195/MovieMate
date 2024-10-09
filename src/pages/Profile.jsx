import { useFormik } from "formik";
import MovieHolder from "../components/MovieHolder";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import useDrag from "../hooks/useDrag";
import { btnClassName,btnClassName2 } from "../utils/css";
import { useDispatch, useSelector } from "react-redux";
import useFetchData from "../hooks/useFetch";
import { toast } from "sonner";
import Loading from "../components/helper";
import { login, logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


function Accordion() {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      //added 32 to account for the p-4 of the div
      const newHeight = open
        ? `${contentRef.current.scrollHeight + 32}px`
        : "0px";
      setHeight(newHeight);
    }
  }, [open]);

  return (
    <div className="w-full mt-8 border-2 border-black">
      <h1
        onClick={() => setOpen((prev) => !prev)}
        className="text-xl font-bold cursor-pointer p-4 border  2 border-black"
      >
        My Account
      </h1>
      <div
        ref={contentRef}
        style={{ height }}
        className={` gap-3 font-bold flex flex-col overflow-hidden transition-all duration-300 ${
          open ? "p-4" : "p-0"
        }`}
      >
        <div className="p-4 border-2 hover:scale-[101%] transition duration-300 cursor-pointer">
          Change Password
        </div>
        <div className="p-4 border-2 border-black hover:scale-[101%] transition duration-300 cursor-pointer">
          Delete Account
        </div>
        <div className="p-4 border-2 border-black hover:scale-[101%] transition duration-300 cursor-pointer">
          Logout
        </div>
      </div>
    </div>
  );
}

function EditUserCard({onClick}) {
  const user = useSelector((state) => state.user);
  const { loading, err, response, fetchData } = useFetchData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: user.username || "",
      bio: user.bio || "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(1, "Username must be at least 1 characters long")
        .required("Username is required"),
      password: Yup.string()
        .min(3, "Password must be at least 3 characters long")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const updateResponse=await fetchData(
          `http://localhost:3000/api/users/update/${user.username}`,
          "POST",
          values
        );
        if (updateResponse) {
          console.log('sdfg',updateResponse.data)
          const updatedUser=await fetchData(
            "http://localhost:3000/api/users/login",
            "POST",
            formik.values
          );
          if (updatedUser) {
            dispatch(
              login({
                username: updatedUser.data.user.username,
                bio: updatedUser.data.user.bio,
              })
            );
          toast.success(updateResponse?.data?.message);
          onClick()
        }}
      } catch (e) {
        toast.error(e)
        console.log(e);
      }
    },
  });
  const { ref, position } = useDrag();

  return (
    <form
      ref={ref}
      className="drag cursor-pointer z-30 border-2 border-black bg-main text-sm gap-6 flex p-8 pt-10 flex-col absolute justify-center left-1/2 translate- place-self-end"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onSubmit={formik.handleSubmit}
    >
      <div className="relative ">
        <label
          className="absolute bg-gray-200 rounded-sm px-2 left-3 -top-2  text-[0.7rem]"
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="w-full p-2 px-4 border-2 outline-none focus:border-red-200"
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-black cursor-text">{formik.errors.username}</div>
        ) : null}
      </div>
      <div className="relative ">
        <label
          className="absolute bg-gray-200 rounded-sm px-2 left-3 -top-2  text-[0.7rem]"
          htmlFor="username"
        >
          Bio
        </label>
        <input
          id="bio"
          name="bio"
          type="bio"
          onChange={formik.handleChange}
          value={formik.values.bio}
          className="w-full p-2 px-4 border-2 outline-none focus:border-red-200"
        />
        {formik.touched.bio && formik.errors.bio ? (
          <div className="text-black cursor-text">{formik.errors.bio}</div>
        ) : null}
      </div>
      <div className="relative ">
        <label
          className="absolute bg-gray-200 rounded-sm px-2 left-3 -top-2  text-[0.7rem]"
          htmlFor="username"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="w-full p-2 px-4 border-2 outline-none focus:border-red-200"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-black cursor-text">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="space-x-4 flex">
      <button className={btnClassName} type="submit">
        {loading ? <Loading /> : "Submit"}
      </button>
      <button className={btnClassName2} onClick={onClick}>
        {"Cancel"}
      </button>
      </div>
    </form>
  );
}


function ProfileOverView(){
  const changeEditUserState=() => setEditUser((prev) => !prev)
  const [editUser, setEditUser] = useState(false);
  const user = useSelector((state) => state.user);

  return(
    <>
    <div className="relative z-10 pt-36 flex flex-col md:flex-row ">
        <div className="rounded-[100%] bg-gray-200 border-2 size-40 md:m-0 m-auto "></div>
        <div className="md:pt-20 text-center">
          <p className="font-bold text-xl mb-2">{user?.username}</p>
          <p>{user?.bio}</p>
          <button
            onClick={changeEditUserState}
            className={`${btnClassName} h-fit mt-2`}
          >
            Edit
          </button>
        </div>
      </div>
      {editUser && <EditUserCard onClick={changeEditUserState}/>}   
      </>
  )
}

function ProfileMovies(){
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-8 mt-8">
        <MovieHolder
          title={"My Reviews"}
          url={`http://localhost:3000/api/lists/watchlist/${user.username}`}
        />
        <MovieHolder
          title={"Watchlist"}
          url={`http://localhost:3000/api/lists/watchlist/${user.username}`}
        />
        <MovieHolder
          title={"Watched"}
          url={`http://localhost:3000/api/lists/watchedMovies/${user.username}`}
        />
      </div>
  )
}

function Profile() {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutFunc = () => {
    dispatch(logout());
    navigate("/");
  };
  console.log('profile page re render')
  return (
    <div className=" bg-main px-20 relative">
      <div className="bg-gray-500 h-52 inset-0 absolute w-full z-0"></div>
    <ProfileOverView/>
      <ProfileMovies/>

      
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
