import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";

let schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
  adminSecret: yup.string().required("Admin secret is Required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      adminSecret: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setFormError("");
      dispatch(register(values));
    },
  });

  const authState = useSelector((state) => state);
  const { user, isError, isSuccess, message } = authState.auth;

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    if (user?.role === "admin") {
      navigate("/admin/dashboard");
      return;
    }

    localStorage.removeItem("user");
    setFormError("Access denied");
  }, [isSuccess, navigate, user]);

  const errorMessage = formError || (isError ? message : "");

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h4 className="text-center mb-1">ShopNova</h4>
        <h3 className="text-center title">Admin Register</h3>
        <p className="text-center">
          Create a new admin account with the secret key.
        </p>
        <div className="error text-center">{errorMessage}</div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Full Name"
            i_id="name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error mt-2">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="text"
            label="Email Address"
            i_id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Password"
            i_id="password"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <CustomInput
            type="password"
            label="Admin Secret"
            i_id="adminSecret"
            name="adminSecret"
            onChng={formik.handleChange("adminSecret")}
            onBlr={formik.handleBlur("adminSecret")}
            val={formik.values.adminSecret}
          />
          <div className="error mt-2">
            {formik.touched.adminSecret && formik.errors.adminSecret}
          </div>
          <div className="mb-3 text-end">
            <Link to="/admin/login" className="text-decoration-none">
              Back to login
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
