import { useFormik } from "formik";
import MovieHolder from "../components/MovieHolder";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import useDrag from "../hooks/useDrag";

const btnClassName =
  "bg-accent  font-semibold w-fit transition-transform hover:scale-105 active:scale-90 text-thrid p-2 px-3 rounded-xl ";

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

function EditUserCard({ containerRef }) {
  const formik = useFormik({
    initialValues: {
      username: 12,
      bio: "bio",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters long")
        .required("Username is required"),
      bio: Yup.string()
        .min(10, "Bio must be at least 10 characters long")
        .required("Bio is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { ref, position } = useDrag();
  
  return (
    <form
      ref={ref}
      className="drag cursor-pointer z-30 border-2 border-black bg-main text-sm gap-6 flex p-8 pt-10 flex-col absolute justify-center left-1/2 translate- place-self-end"
      style={{top: `${position.y}px`, left: `${position.x}px` }}
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
      <button className={btnClassName} type="submit">
        Submit
      </button> 
    </form>
  );
}

function Profile() {
  const [editUser, setEditUser] = useState(false);

  const movies = [
    "Avatar (2003)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
  ];

  return (
    <div className=" bg-main relative">
      <div className="bg-gradient-2 h-52 absolute w-full z-0"></div>

      <div className="relative z-10 pt-36 flex ml-28">
        <div className="rounded-[100%] bg-gray-900 w-44 h-44" ></div>
        <div className="fle pt-20 ml-8">
          <p className="font-bold text-xl mb-2">Username</p>
          <p>This is where the bio goes</p>
        </div>
        <button
          onClick={() => setEditUser((prev) => !prev)}
          className={`${btnClassName} absolute right-20 top-60`}
        >
          Edit
        </button>
      </div>
        {editUser && <EditUserCard />}

      <div className="flex flex-col gap-8 mx-4 mt-8">
        <MovieHolder title={"My Reviews"} movies={movies} />
        <MovieHolder title={"Watchlist"} movies={movies} />
        <MovieHolder title={"Watched"} movies={movies} />
      </div>
      <Accordion />
    </div>
  );
}

export default Profile;
