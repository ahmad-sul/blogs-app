import React, { useEffect, useState } from 'react'
import baseURL from '../config/baseURL'
import axios from 'axios'
import {Link} from "react-router-dom"



export default function AllBlogs() {
const [allBlog, setAllBlogs]= useState()
const [user, setUser]= useState()

const getUser =async()=>{
   
    const userId =localStorage.getItem('userId')
    if (userId) {
      const userData = await axios.get(baseURL+'users/'+userId)
      // console.log(userData);
      setUser(userData.data)
    }
  }
    const getBlogs = async(e)=>{

        try{
        const allBlogsData = await axios.get(baseURL + "blogs")
        // console.log('all Bllllllllllllllllllllllllllllgs',allBlogsData.data.data);
        setAllBlogs(allBlogsData.data.data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getUser()
      getBlogs()
    },[])

    const deleteBlog =async(id)=>{
        console.log(id)
        const deleteBlogs= await axios.delete(baseURL+'blogs/deleteBlogs/'+id)
        
        window.location.reload();
    }
// console.log(allBlog.data);
    return user? (
        <div className='container '>
             <h1>All Blogs</h1>
           <h4>Hallo {user.userName}</h4>
           <h4>{user.email}</h4>
          
     {allBlog && allBlog.length > 0 ? (allBlog.map((el)=>{
        //  console.log(el);
         return ( <div key={el.id}>
             <li className='d-flex m-3 justify-content-between border'>
                <div className='d-flex align-items-center'>
                    <img src={require(`./images/${el.img}`).default} className="" width='100' alt="2"/>
                    <p className='bg-white ms-2'>{el.title}</p> 
                </div>
                <div className='d-flex align-items-center'>
                
                <Link to={'/editBlog/'+el._id} className="btn btn-outline-success me-2">Edit</Link>
                {/* <Link to={'/deleteBlogs/'+el._id} className="btn btn-outline-success me-2" onClick={deleteBlog}>Delete</Link> */}
                <button type="button" name={el._id} className="btn btn-outline-danger me-2" onClick={()=>deleteBlog(el._id)}>Delete</button>
                </div>
            
             </li>
         </div> )
       
     })): <div>No Blogs</div> }
        </div>
    ): <div>
        loading
    </div>
}


