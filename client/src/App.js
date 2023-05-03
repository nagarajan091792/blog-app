import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Portal from './components/Portal';
import PrivateRoutes from './components/PrivateRoute';
import AllPosts from './components/AllPosts';
import AddPost from './components/AddPost';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import UserPosts from './components/UserPosts';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';
import DefaultPage from './components/DefaultPage';

function App() {
  
  return (
    <>
   
    <Routes>

      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/' element={<DefaultPage/>} />


      <Route element={<PrivateRoutes />}>
      <Route path="/portal" element={<Portal/>}>

      <Route path='allPosts' element={<AllPosts/>} /> 
      <Route path='myPosts/:id' element={<UserPosts/>} /> 
      <Route path='addPost' element={<AddPost/>} /> 
      <Route path='viewPost/:id' element={<ViewPost/>} /> 
      <Route path='edit/:id' element={<EditPost/>} /> 


      </Route>
      </Route>
    </Routes>
   
    </>
  );
}

export default App;


// import { Route, Routes } from 'react-router-dom';
// import './App.css';
// import React from 'react';
// import Header from './components/Header';
// import Login from './components/Login';
// import Blogs from './components/Blogs';
// import UserBlogs from './components/UserBlogs';
// import BlogDetail from './components/BlogDetail';
// import AddBlog from './components/AddBlog';
// import { useSelector } from 'react-redux';
// import Signup from './components/Signup';
// import AllBlogs from './components/AllBlogs';
// function App() {
//   const isLoggedIn = useSelector(state=>state.isLoggedIn);
//   console.log(isLoggedIn)
//   return (
//     <>
//     <React.Fragment>
//     <Header/>
//     <Routes>
//     <Route path='/' element={<AllBlogs/>} /> 
//       <Route path='/login' element={<Login/>} />
//       <Route path='/signup' element={<Signup/>} />

//       <Route path='/blogs' element={<Blogs/>} />
//       <Route path='/myBlogs' element={<UserBlogs/>} />
//       <Route path='/myBlog/:id' element={<BlogDetail/>} />
//       <Route path='/blog/add' element={<AddBlog/>} />
//     </Routes>
//     </React.Fragment>
//     </>
//   );
// }

// export default App;
