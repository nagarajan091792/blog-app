import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {AppBar, Box, Button,  Toolbar, Typography} from "@mui/material"
import img from '../img/gif5.gif'
const Api=process.env.REACT_APP_API_KEY


const DefaultPage = () => {
  const [user, setUser] = useState([]);
  const [isLoading,setLoading] = useState(false)

  useEffect(() => {
    fetchdata();
  }, []);

  let fetchdata = async () => {
    try {
      setLoading(true)
      let a = await axios.get(`${Api}/defaultPage`
       
      );
      setUser(a.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
<>
<AppBar position='sticky' sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(14,9,121,0.9752275910364145) 35%, rgba(0,212,255,1) 100%)"}}>
      <Toolbar>
        <Typography variant='h4'>Blog App</Typography>
        <Box display={"flex"} marginLeft={"auto"}>
         <Button LinkComponent={Link} to='/login' variant='contained' sx={{margin:1, borderRadius:10}}>Login</Button>
          <Button LinkComponent={Link} to='/signup' variant='contained' sx={{margin:1, borderRadius:10}}>Signup</Button>
        </Box>
      </Toolbar>
    </AppBar>
    {isLoading?<div><img src={img} alt='' style={{marginLeft:'auto',marginRight:'auto',marginTop:'10%',display:'block',width: '50%'}}/></div>
:
     <div className='container' style={{marginTop:50}}>
     <div className='row' >
    
     {user.map((e) => {
             return (
 <div class="card text-center mx-auto" style={{width: "13rem",margin:10,boxShadow:'10px 10px 10px #087474'}}>
 <img class="card-img-top" style={{height:'150px'}} src={e.imageURL} alt="blog"/>
   <div class="card-body">
     <h5 class="card-title">{e.title}</h5>
     </div>
   <div class="card-footer text-muted">
   <Link className=' btn btn-primary' to={'/login'}>More Details</Link>
   </div>
 </div>
             )}) } 
 
     </div>
     </div>
    }
   
    </>
    )
}

export default DefaultPage
