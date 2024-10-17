import { toast } from "sonner";
import useFetchData from "../../../hooks/useFetch2.0";
import Loading from "../../../components/helper";
import { useFormik } from "formik";

function NameDescriptionCard({ addPlaylistStateHandler, username }) {
    const { loading, fetchData } = useFetchData();
  
    const formik = useFormik({
      initialValues: {
        name: "",
        description: "",
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .max(20, "Name must be 20 characters or less")
          .required("Name is required"),
        description: Yup.string()
          .max(100, "Description must be 100 characters or less")
          .required("Description is required"),
      }),
      onSubmit: async(values) => {
        const response = await fetchData(
          "POST",
          `/lists/playlist/${username}`,
          values
        );
        toast.success(response?.data?.message)
        addPlaylistStateHandler();
      },
    });
  
    return (
      <div className="bg-main shadow-xl absolute z-30  left-1/2 -translate-x-1/2 rounded-md p-6 w-1/3">
        <h2 className="text-lg font-semibold mb-4">
          Playlist Name & Description
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">


          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`p-2 border rounded ${
                formik.touched.name && formik.errors.name ? "border-red-500" : ""
              }`}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
  




          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`p-2 border rounded ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
  



          <div className="space-x-3">
            <button type="submit" className={btnClassName}>
              {loading ? <Loading /> : "Submit"}
            </button>
            <button onClick={addPlaylistStateHandler} className={btnClassName2}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
export default NameDescriptionCard