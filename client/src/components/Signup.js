import React from 'react'
import {Box,Typography,TextField,Button, AppBar, Toolbar} from "@mui/material"
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Api=process.env.REACT_APP_API_KEY

const Signup = () => {
  const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          username: "",
          email: "",
          password: "",
          blogs: []
        },
        onSubmit: async (values) => {
          try {
            const register = await axios.post(`${Api}/signup`, values);
           toast(register.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
           if (register.data.message === "user registered added successfully") {
            setTimeout(() => {  navigate("/login")}, 3000);
          } else {
            navigate("/signup");
          }
           
          } catch (error) {
            console.log("register error");
          }
        },
      });
  return (
    <div>
      <AppBar position='sticky' sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(14,9,121,0.9752275910364145) 35%, rgba(0,212,255,1) 100%)"}}>
      <Toolbar>
        <Typography variant='h4'>Blog App</Typography>
        <Box display={"flex"} marginLeft={"auto"}>
         <Button LinkComponent={Link} to='/login' variant='contained' sx={{margin:1, borderRadius:10}}>Login</Button>
          <Button LinkComponent={Link} to='/signup' variant='contained' sx={{margin:1, borderRadius:10}}>Signup</Button>
        </Box>
      </Toolbar>
    </AppBar>
    <form onSubmit={formik.handleSubmit}>
      <Box maxWidth={500} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} boxShadow={'10px 10px 20px #087474'} padding={3} margin={'auto'} marginTop={5} borderRadius={5}>
        <Typography variant='h4' padding={3} textAlign={'center'}> Create Your Account</Typography>
          <TextField          name="username"
                              onChange={formik.handleChange}
                              value={formik.values.username}
                              placeholder='Name' margin='dense' required/>
          <TextField          name="email"
                              onChange={formik.handleChange}
                              value={formik.values.email} type='email' placeholder='Email' margin='dense' required/>
          <TextField          name="password"
                              onChange={formik.handleChange}
                              value={formik.values.password}  type='password' placeholder='Password' margin='dense' required/>
         
          <Button type='submit' value='Signup' variant='contained' sx={{borderRadius:3, marginTop:3}}>Submit</Button>
          <ToastContainer />
          <Button LinkComponent={Link} to='/login' sx={{borderRadius:3, marginTop:3}}>Already have an account?</Button>
        
      </Box>
    </form>
  </div>
  )
}

export default Signup



