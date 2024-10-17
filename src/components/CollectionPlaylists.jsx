import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import { btnClassName, btnClassName2 } from "../utils/css";
import { toast } from "sonner";
import Loading, { Scroller } from "./helper";
import { useSelector } from "react-redux";



function Skeleton() {
  return <div className="bg-gray-500 w-full h-20 skeleton-shimmer"></div>;
}



export default PlaylistBody;
