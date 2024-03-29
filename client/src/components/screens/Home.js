import React, { useEffect, useState } from 'react'
import { BACKENDURL } from "../../utils/utils";

const Home = () => {
    const [data ,setData] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{

            await fetch(`${BACKENDURL}/allpost`,{
                headers:{
                    'Authorization': "Bearer " + localStorage.getItem('jwt')
                }
            }).then(res=> res.json())
                .then(result=>{
                    // console.log(result);
                    setData(result.posts)
                })
        }
        fetchData();
    },[])
  return (
    <div className='home'>
        {
            data.map((item) =>{
                return(
                   
                    <div className='card home-card' key = {item._id}>
                    <h5>{item.postedBy?.name}</h5>
                    <div className='card-image'>
                        <img src={item.photo} alt="post"/>
                    </div>
                    <div className='card-content'>
                    <i className="material-icons">favorite</i>
                        <h6>{item.title}</h6>
                        <p>{item.body}</p>
                        <input type="text" placeholder='add comment' />
                    </div>
                </div>   
                );
            })
        }

       
    </div>
  )
}

export default Home