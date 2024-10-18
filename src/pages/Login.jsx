  import React, { useEffect, useState } from "react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import useFetchData from "../hooks/useFetch2.0";
  import Loading from "../components/helper";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { login } from "../redux/userSlice";
  import { toast } from "sonner";

  const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    const user = useSelector((state) => state.user);
    const { loading,error, fetchData } = useFetchData();

    const [response, setResponse]=useState(null)

    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string()
          .required("Password is required")
          .min(3, "Password must be at least 3 characters long"),
      }),
      onSubmit: async () => {
        try {
           const data=await fetchData(
            "POST",
            "/users/login",
            formik.values
          );
          setResponse(data.data)
        } catch (e) {
          toast.error(e);
        }
      },
    });
    useEffect(() => {
      const from=location.state?.from?.pathname || '/'
      if (localStorage.getItem("accessToken")) {
       return navigate(from);
      }
      console.log(response)
      if (response) {
        dispatch(
          login({
            username: response.user.username,
            bio: response.user.bio,
          })
        );
        localStorage.setItem("accessToken", response.accessToken);
        navigate(from);
      }
    }, [response, dispatch, navigate]);
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="p-6 rounded-lg shadow-md w-full max-w-md border-2 border-black">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4 ">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
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
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </div>
              )}
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
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? <div className="size-8 m-auto"><Loading /></div> : "Login"}
            </button>
            <p className="text-sm"><Link to="/forgot-password">Forgot Password?</Link></p>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
          </form>
        </div>
      </div>
    );
  };

  export default Login;
