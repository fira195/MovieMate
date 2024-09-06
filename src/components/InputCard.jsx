import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function NameDescriptionCard() {
  // Initialize Formik with validation
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
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="bg-white shadow-lg rounded-md p-6 max-w-md">
      <h2 className="text-lg font-semibold mb-4">Add Name & Description</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">Name</label>
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

        {/* Description Field */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1">Description</label>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default NameDescriptionCard;
