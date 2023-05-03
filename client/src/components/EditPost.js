
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import img from '../img/gif5.gif'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Api=process.env.REACT_APP_API_KEY

const labelStyle = { mb: 1, mt: 1, fontSize: "18px", fontWeight: "bold" };

const EditPost = () => {
  let navigate = useNavigate();
  let params = useParams();
  useEffect(() => { fetchData() }, []);
  const [isLoading, setLoading] = useState(false)
  let fetchData = async () => {
    try {
      setLoading(true)
      let a = await axios.get(
        `${Api}/portal/edit/${params.id}`,
        {
          headers: {
            authorization: `${localStorage.getItem("react_app_token")}`,
          },
        }
      );

      formik.setValues(a.data);
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      imageURL: "",
      user: localStorage.getItem("id")
    },


    onSubmit: async (values) => {
      try {
        delete values._id;
        await axios.put(
          `${Api}/portal/edit/${params.id}`,
          values,
          {
            headers: {
              authorization: `${localStorage.getItem("react_app_token")}`,
            },
          }
        );
        toast('Post Updated Successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => { navigate(`/portal/myPosts/${localStorage.getItem('id')}`) }, 3000);
      } catch (error) {
        console.log(error);
      }
    },
  });


  return (<>
    {isLoading ? <div><img src={img} alt='' style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '50%' }} /></div>
      :
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
            />
            <InputLabel sx={labelStyle}>Content</InputLabel>
            <TextField
              name="content"
              onChange={formik.handleChange}
              value={formik.values.content}
              margin="none"
              variant="outlined"
            />
            <InputLabel sx={labelStyle}>ImageURL</InputLabel>
            <TextField
              name="imageURL"
              onChange={formik.handleChange}
              value={formik.values.imageURL}
              margin="none"
              variant="outlined"
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
              value='EditPost'
            >
              Update
            </Button>          <ToastContainer />

          </Box>
        </form>
      </div>
    }
  </>
  )
}

export default EditPost