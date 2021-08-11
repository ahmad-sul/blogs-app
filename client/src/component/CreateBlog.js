import React, { useState } from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import toolbarOptions from "./ToolBar";
import baseURL from '../config/baseURL'
import axios from 'axios'


export default function CreateBlog() {
    const [content, setContent] = useState('')
    const newBlog=async (e)=>{
        e.preventDefault()
        const userId =localStorage.getItem('userId')
        console.log(e.target.img.value);
        const title = e.target.title.value
        const img = e.target.img.value
        const Category = e.target.Category.value
    
        const blog = {
            title,
            img,
            Category,
            content,
            userId
        }
        console.log('Create blog  ==>', blog);
        try{
            const res = await axios.post(baseURL + "blogs/", blog)
            console.log(res);
            setTimeout(() => {
                window.location.replace("/blogs");
              }, 3000);
        }catch(e){
            console.log(e);
        }
    }
    return (
        <div className='container Page'>
            <h2>Create Blog</h2>
            <form onSubmit={newBlog}>
           <fieldset>
           <div className="mb-3">
           <label htmlFor="exampleInputText" className="form-label">Title</label>
            <input type="text" name='title' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
           </div>

           <div className="mb-3">
             <label htmlFor="exampleInputText" className="form-label">Category</label>
             <input type="text" name='Category' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
             
            <div className="mb-3">
             <label htmlFor="exampleInputText" className="form-label">Cover Image URL</label>
             <input type="text" name='img' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>

            <div className="mb-3 h-25">
            <label for="exampleInputPassword1" class="form-label">Content</label>
            <ReactQuill
            className="h-25"
            modules={{ toolbar: toolbarOptions }}
            value={content}
            onChange={setContent}
            theme="snow"
            
          />
            </div>

            <button type="submit" className="btn btn-primary mb-5" >Submit</button>
            </fieldset>
             </form>
        </div>
    )
}
