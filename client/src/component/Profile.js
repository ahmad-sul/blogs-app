import React, {   useEffect, useState } from 'react'
import baseURL from '../config/baseURL'
import axios from 'axios'


export default function Profile() {
    const [user, setUser]= useState()
  
    const getUser =async()=>{
        const userId =localStorage.getItem('userId')
        if (userId) {
          const userData = await axios.get(baseURL+'users/'+userId)
          // console.log(userData);
          setUser(userData.data)
        }
      }
    useEffect(() => {
        getUser()
      
    }, [])
    // console.log(user);
  
    const updateUser =async (e)=>{
        e.preventDefault()
        const userId =localStorage.getItem('userId')
    
        console.log('update User' , user);
        const userData = {
            userName:e.target.username.value,
            avatar:e.target.avatar.value
        }
        console.log(userData);
        try{
            const res = await axios.post(baseURL+'users/'+ userId, userData)
            console.log(res);
            window.location.reload()
        }catch(e){
            console.log(e);
        }
    }
    return user ?(
        <div className='container height'>
            <h1>My Profile</h1>
           <h4>Hallo {user.userName}</h4>
           <img src={user.avatar} alt="" width='100'/>

           <form onSubmit={updateUser}>
           <fieldset>
           <div className="mb-3">
           <label htmlFor="exampleInputText" className="form-label">User Name</label>
            <input type="text" name='username' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={user.userName}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
           </div>

            <div className="mb-3">
            
             <label htmlFor="exampleInputEmail1" className="form-label">User Email (read only)</label>
             <input type="email" className="form-control" id="exampleInputEmail1" readOnly value={user.email} aria-describedby="emailHelp" />
            </div>

           <div className="mb-3">
             <label htmlFor="exampleInputText" className="form-label">Avatar URL</label>
             <input type="text" name='avatar' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  defaultValue={user.avatar}/>
            </div>
             
            <button type="submit" className="btn btn-primary" >Submit</button>
            </fieldset>
             </form>

        </div>
    ):<div>
    loading
</div>
}
