import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes=()=>{
  const location= useLocation()
  const accessToken = localStorage.getItem("accessToken")

  return (
        accessToken && accessToken!==undefined? <Outlet/> : <Navigate to={'/login'} state={{from: location}}></Navigate>
    )
}
export default PrivateRoutes
