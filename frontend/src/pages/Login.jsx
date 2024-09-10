import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import { useFormik } from "formik";
import { loginSchema } from "../schema";
import InputField from "../components/inputForm/InputField";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { loginUser, user } = useAppStore();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => loginUser(values, navigate),
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <section className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>

          <p className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Get Started
            </span>
          </p>

          <InputField
            handleChange={formik.handleChange}
            name="email"
            title="Email"
            type="email"
            value={formik.values.email}
            errors={formik.errors}
            touched={formik.touched}
            handleBlur={formik.handleBlur}
          />
          <InputField
            handleChange={formik.handleChange}
            name="password"
            title="Password"
            type="password"
            value={formik.values.password}
            errors={formik.errors}
            touched={formik.touched}
            handleBlur={formik.handleBlur}
          />
          <h2
            onClick={() => navigate("/forgot-password")}
            className="text-blue-500 text-right cursor-pointer hover:underline"
          >
            Forgot Password?
          </h2>
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
