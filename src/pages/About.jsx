import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

function About() {
  const text = {
    the_story: `Welcome to [Website Name], your ultimate movie tracking and discovery platform. Our mission is to help movie enthusiasts like you keep track of the movies you love, discover new favorites, and share your passion with the world. MovieMate was born out of a deep love for movies and a passion for web development. As a movie enthusiast and web developer, I wanted to create a platform where fellow movie lovers can come together, discover new films, and keep track of their favorites. With years of experience in web development, I utilized my skills to build a user-friendly and feature-rich website. [Website Name] not only reflects my love for movies but also showcases my ability to create engaging and functional web applications.`,
    about_me: `Welcome to [Website Name], your ultimate movie tracking and discovery platform. Our mission is to help movie enthusiasts like lovers can come together, discover new films, and keep track of their favorites. With years of experience in web development, I utilized my skills to build a user-friendly and feature-rich website. [Website Name] not only reflects my love for movies but also showcases my ability to create engaging and functional web applications.`,
  };
  const features = [
    {
      title: "Track movies you've watched and want to watch.",
      detail: "",
    },
    {
      title: "Get personalized recommendations.",
      detail: "",
    },
    {
      title: "Create and share playlists.",
      detail: "",
    },
    {
      title: "Rate and review movies.",
      detail: "",
    },
  ];
  const formik = useFormik({
    initialValues: {
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(" Email is required"),
      message: Yup.string().required("Message Details are required"),
    }),
    onSubmit: (values) => {
      toast.success("Playlist Updated");
      console.log("Form values:", values);
    },
  });
  return (
    <div className="min-h-screen  bg-red-950 relative ">
      <div className="bg-gradient-to-b from-gray-500 to-gray-400 h-52 absolute w-full z-0 flex items-center">
        <p className="font-bold text-2xl ml-16">About Us</p>
      </div>
      <div className="pt-60 p-10 flex gayp-10">
        <div className="size-96 flex-shrink-0 bg-yellow-50"></div>
        <div className="text-yellow-50 w-1/2 text-justify">
          {text.the_story}
          <div className="flex gap-4 justify-center my-5">
            <div className="bg-gray-600 size-9 rounded-2xl"></div>
            <div className="bg-gray-600 size-9 rounded-2xl"></div>
            <div className="bg-gray-600 size-9 rounded-2xl"></div>
          </div>
        </div>
        <form className="mt-20 p-4 flex flex-col w-fit gap-4 self-center absolute right-10  bg-yellow-50"
          onSubmit={formik.handleSubmit}
        >
          <input
            className={`rounded-lg px-4 p-2 outline-none border-2 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-red-700"
            }`}
            type="text"
            placeholder="Email"
            name="playlistName"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
          <textarea
            className={`rounded-lg px-4 p-2 outline-none border-2 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-red-700"
            }`}
            type="text"
            placeholder="Message"
            name="playlistName"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
          <button className="rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 px-4 p-2 text-yellow-50 bg-red-500">
            Send Now
          </button>
          <div className="flex gap-4 justify-center my-5">
            <div className="bg-gray-600 size-9 rounded-2xl"></div>
            <div className="bg-gray-600 size-9 rounded-2xl"></div>
            <div className="bg-gray-600 size-9 rounded-2xl"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default About;

/* <div className="grid grid-cols-12 pt-52 ">
        <div className="col-span-9 overflow-scroll no-scrollbar p-6 text-yellow-50 space-y-10">
        <div className="flex gap-4 items-center font-semibold mb-6">
            <div className="bg-red-500 h-10 w-2 ml-2"></div>
            <h1 className="text-yellow-50 text-xl">Features</h1>
          </div>
        <div className="grid grid-cols-4 gap-7 mx-10">
            {features.map((item) => (
              <div className="bg-yellow-50 p-4 h-44 text-black ">
                {item.title}
              </div>
            ))}
          </div>
          <div className="flex gap-4 items-center font-semibold mb-2 ">
            <div className="bg-red-500 h-10 w-2 ml-2"></div>
            <h1 className="text-yellow-50 text-xl">The Story</h1>
          </div>
          <div className="flex gap-20 pl-10 align-middle items-center">
            <div className="w-1/2 leading-8">{text.the_story}</div>
            <div className=" h-80 w-1/3 flex-shrink-0 bg-yellow-50"></div>
          </div>

          <div className="flex gap-4 items-center font-semibold mb-6">
            <div className="bg-red-500 h-10 w-2 ml-2"></div>
            <h1 className="text-yellow-50 text-xl">About Me</h1>
          </div>
          <div className="flex gap-20 pl-10 items-center">
            <div className=" h-80 w-1/3 flex-shrink-0 bg-yellow-50"></div>
            <div className="w-1/2 leading-8">{text.about_me}</div>
          </div>
          
          
        </div>

        
      </div> */
