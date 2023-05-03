import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ViewPost from './ViewPost';
import img from '../img/gif5.gif'
const Api=process.env.REACT_APP_API_KEY

const AllPosts = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    fetchdata();
  }, []);

  let fetchdata = async () => {
    try {
      setLoading(true)
      let a = await axios.get(`${Api}/portal/allPosts`, {
        headers: {
          authorization: `${localStorage.getItem("react_app_token")}`,
        },        
        
      });
      setUser(a.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const [model, setModel] = useState(false)
  const [tempData, setTempdata] = useState([])

  const getData = (title, content, imageURL) => {
    let tempData = [title, content, imageURL]
    setTempdata(item => [1, ...tempData])
    return setModel(true)
  }
  return (
    <>
      {isLoading ? <div><img src={img} alt='' style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '50%' }} /></div>
        :
        <div className='container' style={{ marginTop: 50 }}>
          <div className='row' >

            {user.map((e) => {
              return (
                <div class="card text-center mx-auto" style={{ width: "13rem", margin: 10,boxShadow:'10px 10px 10px #087474' }}>
                  <img class="card-img-top" style={{ height: '150px' }} src={e.imageURL} alt="Card image cap" />
                  <div class="card-body">
                    <h5 class="card-title">{e.title}</h5>
                  </div>
                   <div class="card-footer text-muted">    <h6>Posted by: <span style={{color:'red'}}>{e.name}</span></h6>               </div>

                  <div class="card-footer text-muted">
                    <button className=' btn btn-primary ' onClick={() => getData(e.title, e.content, e.imageURL)}>More Details</button>
                  </div>
                </div>
              )
            }
            )}

          </div>
        </div>

      }{
        model === true ? <ViewPost title={tempData[1]} content={tempData[2]} imageURL={tempData[3]} hide={() => setModel(false)} /> : ''
      }

    </>
  )
}

export default AllPosts
