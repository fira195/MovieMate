import { useDispatch, useSelector } from "react-redux";
import useFetchData from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useDrag from "../../hooks/useDrag";
import { btnClassName, btnClassName2 } from "../../utils/css";

function EditProfile({onClick}) {
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
        <button className={btnClassName } type="submit">
          {loading ? <Loading /> : "Submit"}
        </button>
        <button className={btnClassName2} onClick={onClick}>
          {"Cancel"}
        </button>
        </div>
      </form>
    );
  }
  export default EditProfile