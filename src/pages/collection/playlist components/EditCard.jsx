import { useFormik } from "formik";
import useFetchData from "../../../hooks/useFetch2.0";
import { useSelector } from "react-redux";
import Loading from "../../../components/helper";
import { toast } from "sonner";
import * as Yup from 'yup'

function EditCard({ playlist, cardViewHandler, fetchPlaylists }) {
    const { loading, fetchData } = useFetchData();
    const user = useSelector((state) => state.user);
    const formik = useFormik({
      initialValues: {
        name: `${playlist?.name || ""}`,
        description: `${playlist?.description || ""}`,
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Playlist Name is required"),
        description: Yup.string(),
      }),
      onSubmit: async(values) => {
        const response= await fetchData(
          'PUT',
          `/lists/playlist/${user.username}/${playlist._id}/protected`,
          values
        );
        console.log(response)
        toast.success(response?.data?.message)
        fetchPlaylists(); //fetch the playlists again after this one has been deletd 
        cardViewHandler(); // closes the edit card
      },
    });

    const deletePlaylist = async() => {
      const response= await fetchData(
        "DELETE",
        `/lists/playlist/${user.username}/${playlist._id}/protected`,
      )
        fetchPlaylists(); //fetch the playlists again after this one has been deletd 
        cardViewHandler(); // closes the edit card
    };
  
    return (
      <div className="border-2 top-0  border-black z-30 absolute bg-main flex flex-col p py-10 p-4 gap-4 mt-6 w-fit">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              className={`rounded-lg px-4 p-2 outline-none border-2 `}
              type="text"
              placeholder="Playlist Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-black">{formik.errors.name}</div>
            ) : null}
  
            <input
              className={`rounded-lg px-4 p-2 outline-none border-2 `}
              type="text"
              placeholder="Playlist Details"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-black">{formik.errors.description}</div>
            ) : null}
  
            <div className="flex gap-4 font-semibold">
              <button
                type="submit"
                className="rounded-md transition-all duration-300 hover:scale-105 active:scale-95 px-4 p-2 text-thrid bg-accent"
              >
                {loading ? <Loading /> : "Update"}
              </button>
              <button
                type="button"
                onClick={deletePlaylist}
                className="rounded-md transition-all duration-300 hover:scale-105 active:scale-95 px-4 p-2  border-2 border-black"
              >
                {loading ? <Loading /> : "Delete"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  export default EditCard