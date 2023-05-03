import React from 'react'
import { Box, Typography, TextField, Button, AppBar, Toolbar } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Api=process.env.REACT_APP_API_KEY


const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const login = await axios.post(`${Api}/login`, values);
        toast(login.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        localStorage.setItem("react_app_token", login.data.token);
        localStorage.setItem("profile", login.data.profile);
        localStorage.setItem("id", login.data.id);
        if (login.data.message === "successfully logged in") {

          setTimeout(() => { navigate("/portal/allPosts") }, 3000);
        } else {
          navigate("/signup");
        }
      } catch (error) {
        console.log("login error");
      }
    },
  });
  return (
    <div>
      <AppBar position='sticky' sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(14,9,121,0.9752275910364145) 35%, rgba(0,212,255,1) 100%)" }}>
        <Toolbar>
          <Typography variant='h4'>Blog App</Typography>
          <Box display={"flex"} marginLeft={"auto"}>
            <Button LinkComponent={Link} to='/login' variant='contained' sx={{ margin: 1, borderRadius: 10 }}>Login</Button>
            <Button LinkComponent={Link} to='/signup' variant='contained' sx={{ margin: 1, borderRadius: 10 }}>Signup</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <form onSubmit={formik.handleSubmit}>
        <Box maxWidth={400} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} boxShadow={'10px 10px 20px #087474'} padding={3} margin={'auto'} marginTop={5} borderRadius={5}>
          <Typography variant='h4' padding={3} textAlign={'center'}> Login</Typography>
          {/* <TextField  placeholder='Name' margin='dense'/> */}
          <TextField type='email' placeholder='Email' margin='dense' name="email"
            onChange={formik.handleChange}
            value={formik.values.email} required />
          <TextField type='password' placeholder='Password' margin='dense' name="password"
            onChange={formik.handleChange}
            value={formik.values.password} required />
          <Button type='submit' value='Login' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }}>Submit</Button>
          <ToastContainer />
          <Button LinkComponent={Link} to='/signup' sx={{ borderRadius: 3, marginTop: 3 }}>Create an Account</Button>

        </Box>
      </form>
    </div>
  )
}

export default Login




