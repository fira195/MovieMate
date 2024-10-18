import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../components/helper";
import useFetchData from "../hooks/useFetch2.0";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
function ResetPassword() {
  const { loading, error, fetchData } = useFetchData();
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: Yup.object({
      password: Yup.string().required("password is required"),
    }),
    onSubmit: async () => {
      let response = await fetchData(
        "POST",
        `/users/reset-password/${username}/${token}`,
        formik.values
      );
      toast.success(response?.data?.message);
      navigate('/')
    },
  });
  const { token, username } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-main">
      <div className="p-6 rounded-lg shadow-md w-full max-w-md border-2 border-black">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="text"
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
          >
            {loading ? <Loading /> : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ResetPassword;
