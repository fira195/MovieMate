import { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { btnClassName } from "../../utils/css";

function ProfileOverView() {
    const changeEditUserState = () => setEditUser((prev) => !prev);
    const [editUser, setEditUser] = useState(false);
    const user = useSelector((state) => state.user);
  
    return (
      <>
        <div className="relative z-10 pt-36 flex flex-col md:flex-row ">
          <div className="rounded-[100%] bg-gray-200 border-2 size-40 md:m-0 m-auto cursor-pointer">
            <div></div>
          </div>
          <div className="md:pt-20 text-center">
            <p className="font-bold text-xl mb-2">{user?.username}</p>
            <p>{user?.bio}</p>
            <button
              onClick={changeEditUserState}
              className={`${btnClassName} h-fit mt-2`}
            >
              Edit
            </button>
          </div>
        </div>
        {editUser && <EditProfile onClick={changeEditUserState} />}
      </>
    );
  }
  export default ProfileOverView