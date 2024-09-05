import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "./helper";
import useFetchData from "../hooks/useFetch";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
function ForgotPassword() {
  const { loading, response, err, fetchData } = useFetchData();
  const formik = useFormik({
    initialValues: { email: "" , username: ''},
    validationSchema: Yup.object({
        username: Yup.string().required("Username is required"),

      email: Yup.string()
        .min(5, "Email should be at list 5 characters long")
        .required("Email is required"),
    }),
    onSubmit: async() => {
     await fetchData( `http://localhost:3000/api/users/forgot-password/${formik.values.username}`, 'POST', formik.values )
    toast.success(response?.message)
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-main">
      <div className="p-6 rounded-lg shadow-md w-full max-w-md border-2 border-black">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
            <label htmlFor="username" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`outline-none mt-1 block w-full p-2 border rounded-md ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-colors duration-300"
          >
            {0 ? <Loading /> : "Get Email"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
