import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(3, "Password must be at least 2 characters long"),
    }),
    onSubmit: (values) => {
      fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (!res.ok) throw Error(res.statusText);
          return res.json();
        })
        .then((res) => localStorage.setItem('accessToken', res.accessToken))
        .catch((e) => toast.error(e.message));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center  bg-main">
      <div className=" p-6 rounded-lg shadow-md w-full max-w-md border-2 border-black">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium ">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`outline-none mt-1 block w-full p-2 border rounded-md ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`outline-none mt-1 block w-full p-2 border rounded-md ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
