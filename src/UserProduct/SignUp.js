import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignUp(){
    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword:''
    },

    onSubmit: (values) => {
      const SignUp = {
        email: values.email,
        password: values.password,
        confirmPassword:values.confirmPassword
      };
      axios
        .post("https://localhost:7165/api/Account/SignUp", SignUp)
        .then((res) => {
           
          console.log(res);
          setTimeout(()=>{
            navigate('/');
          },4000);
           toast.info("please verify your Email ");
        
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Please enter an email";
      }
      if (!values.password) {
        errors.password = "Please enter a password";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Please enter a Confirm password";
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Please enter a confirm passWord  must match with password  ";
      }

      return errors;
    }
  });

  return (
    <div className='container w-25'>
      <h3 className='text-center m-5'>SignUp </h3>
     <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label"><b>Email</b></label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter User Email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-danger">{formik.errors.email}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label"><b>Password</b></label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-danger">{formik.errors.password}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label"><b>Confirm Password</b></label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter confirm  Password"
          name="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="text-danger">{formik.errors.confirmPassword}</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">SignUp</button>
      <NavLink to='/'  className="btn btn-primary ms-5">Login</NavLink>
    </form>
    <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </div>
  );
}

export default SignUp;