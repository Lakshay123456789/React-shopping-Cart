import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const login = {
        email: values.email,
        password: values.password,
      };

      axios
        .post("https://localhost:7165/api/Account/login", login)
        .then((res) => {
         
          sessionStorage.setItem('userId', res.data.id);
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('username', res.data.username);
          sessionStorage.setItem('role', res.data.role);
          console.log(res.data.token);
          console.log(res);
                  
          if(res.data.role ==="Admin"){
           
             navigate('/Product');
          }
          else{
          navigate('/User')
          }
           toast.success("successfully login")
        })
        .catch((error) => {
          if(!(error.response.data.isEmailConfirm)){
            toast.info("Please Confirm your email");
          }
          else if(!(error.response.data.passwordConfirm)){
          toast.error("Password is Invalid ");
          }else{
           toast.error("UserEmail is Invalid");
          }
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
      return errors;
    }
  });

 


  return ( <>
    <div className='container w-25'>
      <h3 className='text-center m-5'>login </h3>
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
      <button type="submit" className="btn btn-primary">Login</button>
      <NavLink to='/SignUp'  className="btn btn-primary ms-5"> SignUp</NavLink>
      <NavLink to='/ForgetPassword' className="btn btn-primary m-4">ForgetPassword</NavLink>
    </form>
    
 
    
    </div>
    <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </>
  );
}

export default Login;
