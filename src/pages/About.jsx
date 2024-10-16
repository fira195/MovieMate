import { useFormik } from "formik";
import * as Yup from "yup";
import { btnClassName } from "../utils/css";

function About() {
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
    <div className="min-h-screen bg-main relative  p-5 md:px-20">
      <div className="bg-gray-500 h-52 absolute w-full z-0 inset-0 flex items-center">
        <p className="font-bold text-2xl ml-16">About Us</p>
      </div>
      <div className="grid lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-1 pt-56 gap-4 items-center mb-8">
        <div className="lg:col-span-6 md:col-span-4">
          <div className="flex gap-4 items-center font-semibold mb-6">
            <div className="bg-accent h-10 w-2 ml-2"></div>
            <h1 className="text-xl">The Story</h1>
          </div>
          {`Welcome to [Website Name], your go-to platform for tracking and discovering movies. Born from a passion for films and web development, [Website Name] helps movie lovers find new favorites and keep track of the ones they love. This platform is designed to bring together fellow enthusiasts in a user-friendly and feature-rich environment, reflecting both a love for movies and a commitment to creating engaging web experiences.

`}
        </div>
        <div className="lg:col-span-6 md:col-span-4 hidden lg:inline md:inline">
          <img src="/story.jpg" alt="" />
        </div>
      </div>
      <div className="">
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Contact</h1>
        </div>
        <form
          className=" p-4 flex flex-col w-fit gap-4 border-2 border-accent"
          onSubmit={formik.handleSubmit}
        >
          <input
            className={`rounded-lg px-4 p-2 outline-none border-2 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-accent"
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
                : "border-accent"
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
          <button className={btnClassName}>Send Now</button>
          <div className="flex justify-center items-center gap-4 mt-6 bg-thrid p-4">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/linkedin.png"
              alt="LinkedIn"
              className="w-6 h-6 hover:scale-105 transition"
            />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/github.png"
              alt="GitHub"
              className="w-6 h-6 hover:scale-105 transition"
            />
          </a>
          <a href="mailto:">
            <img
              src="/gmail.png"
              alt="Email"
              className="w-6 h-6 hover:scale-105 transition"
            />
          </a>
        </div>
        </form>
        
      </div>
    </div>
  );
}

export default About;
