import React, {useEffect, useState } from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import toolbarOptions from "./ToolBar";
import baseURL from '../config/baseURL'
import axios from 'axios'
import { useParams, useHistory  } from 'react-router-dom'

export default function EditBlog() {
    const [content, setContent] = useState('')
    const [blog, setBlog]= useState()
  const {id} = useParams()
  let history = useHistory();
 
  
    const getBlog =async()=>{
        try{ 
        //  const userId =localStorage.getItem('userId')
        const userBlogData = await axios.get(baseURL+'blogs/singleBlog/'+id)
        console.log(userBlogData.data)
        setBlog(userBlogData.data)
        setContent(userBlogData.data.content)
    }catch(e){
        console.log(e);
    }
      
      }
    useEffect(() => {
        getBlog()
      
    }, [])

    const updateBlog =async(e)=>{
     
        e.preventDefault()
        // console.log(id);
        // console.log(e.target.Category.value);
     const blogData ={
         title:e.target.title.value,
         img:e.target.img.value,
         Category:e.target.Category.value,
         content  
     }
     console.log(blogData);
     try{
const updateBlog= await axios.post(baseURL+'blogs/editBlog/'+id,blogData)
 console.log('history', history);
history.push("/blogs")
     }catch(e){
       console.log(e);
     }

    }

    return blog?(
        <div className='container'>
            <h1>Edit blog</h1>
            <form onSubmit={updateBlog}>
            <fieldset>
           <div className="mb-3">
           <label htmlFor="exampleInputText" className="form-label">Title</label>
            <input type="text" name='title' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={blog.title}/>
           </div>

           <div className="mb-3">
             <label htmlFor="exampleInputText" className="form-label">Category</label>
             <input type="text" name='Category' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={blog.Category}/>
            </div>
             
            <div className="mb-3">
             <label htmlFor="exampleInputText" className="form-label">Cover Image URL</label>
             <input type="text" name='img' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={blog.img}/>
            </div>

            <div className="mb-3">
            <label for="exampleInputPassword1" class="form-label">Content</label>
            <ReactQuill
            className="h-25"
            modules={{ toolbar: toolbarOptions }}
           
            onChange={setContent}
            defaultValue={blog.content}
            theme="snow"
            
          />
            </div>

            <button type="submit" className="btn btn-primary mb-5" >Submit</button>
            </fieldset>
              </form>
        </div>
    ): <div>
        Loading
    </div>
}

// defaultValue={}