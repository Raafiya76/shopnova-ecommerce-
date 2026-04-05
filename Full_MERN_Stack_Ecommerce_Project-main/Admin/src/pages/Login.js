import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accessDenied, setAccessDenied] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setAccessDenied("");
      dispatch(login(values));
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
    setAccessDenied("Access denied");
  }, [isSuccess, navigate, user]);

  const errorMessage = accessDenied || (isError ? message : "");

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h4 className="text-center mb-1">ShopNova</h4>
        <h3 className="text-center title">Admin Login</h3>
        <p className="text-center">Login to your admin account to continue.</p>
        <div className="error text-center">{errorMessage}</div>
        <form action="" onSubmit={formik.handleSubmit}>
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
            i_id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <Link to="/admin/register" className="text-decoration-none">
              Register admin
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
