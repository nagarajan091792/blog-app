import React from 'react'
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Api=process.env.REACT_APP_API_KEY

const labelStyle = { mb: 1, mt: 1, fontSize: "18px", fontWeight: "bold" };
const AddPost = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      imageURL: "",
      name: localStorage.getItem('profile'),
      user: localStorage.getItem("id")
    },
    onSubmit: async (values) => {
      try {
        await axios.post(`${Api}/portal/addPost`, values, {
          headers: {
            authorization: `${localStorage.getItem("react_app_token")}`,
          },
        });
        toast("Post Added Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => { navigate("/portal/allPosts") }, 3000);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          border={2}
          borderColor="secondary.main"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={2}
          margin={"auto"}
          marginTop={2}
          display="flex"
          flexDirection={"column"}
          width={"50%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="black"
            variant="h4"
            textAlign={"center"}
          >
            Create your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            margin="none"
            variant="outlined"
            required
          />
          <InputLabel sx={labelStyle}>Content</InputLabel>
          <TextField
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            margin="none"
            variant="outlined"
            required
          />
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField
            name="imageURL"
            onChange={formik.handleChange}
            value={formik.values.imageURL}
            margin="none"
            variant="outlined"
            required
          />

          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
            value='AddBlog'
          >
            Submit Blog
          </Button>          <ToastContainer />

        </Box>
      </form>
    </div>
  )
}

export default AddPost;