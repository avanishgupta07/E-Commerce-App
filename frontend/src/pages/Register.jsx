import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import { useFormik } from "formik";
import { registerSchema } from "../schema";
import InputField from "../components/inputForm/InputField";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const { registerUser, user } = useAppStore();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => registerUser(values, navigate),
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const formFields = [
    { name: "name", title: "Name", type: "text", value: formik.values.name },
    { name: "email", title: "Email", type: "email", value: formik.values.email },
    { name: "password", title: "Password", type: "password", value: formik.values.password },
    { name: "confirmPassword", title: "Confirm Password", type: "password", value: formik.values.confirmPassword },
  ];

  return (
    <Layout>
      <section className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800">Get Started</h2>

          <p className="mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

          {formFields.map((field, index) => (
            <InputField
              key={index}
              handleChange={formik.handleChange}
              name={field.name}
              title={field.title}
              type={field.type}
              value={field.value}
              errors={formik.errors}
              touched={formik.touched}
              handleBlur={formik.handleBlur}
            />
          ))}
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default Register;
