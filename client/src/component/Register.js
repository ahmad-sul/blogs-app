import axios from 'axios'
import React, {  useContext } from 'react'
import baseURL from "../config/baseURL";
import MyContext from '../context/MyContext';


export default function Register () {
    const {error, setError, success,setSuccess}= useContext(MyContext)
    
    const submitHandler= async (e)=>{
        e.preventDefault()
        const userName = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value
        const user ={
            userName,
            email,
            password,
            confirmPassword
        }
     console.log('Sign up date ==>', user);
     try{
     const res = await axios.post(baseURL + "users/register", user)
     console.log(res);
     if (res.data.error) {
        
    setError(res.data.error)
    setSuccess(null)     
     }else{
        setError(null);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        setSuccess("registered successfully, redirect in 3s");
        setTimeout(() => {
            window.location.replace("/");
          }, 3000);
     }
     console.log("RES ==> ", res.data);
     }catch(e){
        console.log(e);
     }
    }
//      fetch('http://localhost:5000/users/register',
// {
//     method:'POST',
//     headers:{'Content-Type':'application/json'},
//     body:JSON.stringify(user)
// }).then(res=>res.json())
// .then(result=>{
//     if (result.success) {
//         console.log(result.data)
//     }else{
//         console.log(result.message)
//     }
// })
//     }

    return (
        <div className="register d-flex  flex-column align-items-center  height">
               {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
            <form className="row g-3  w-50 mt-5"  onSubmit={submitHandler}>

                <div className="col-12">
                <label 
                className="form-label text-warning" 
                htmlFor="inputUsername">Username: </label>
                <input  
                className="form-control text-warning" 
                id="inputUsername" 
                type="text" 
                name="username" 
                required />
                </div>
        
                <div className="col-12">
                <label 
                htmlFor="inputEmail4" 
                className="form-label text-warning">Email: </label>
                <input 
                className="form-control text-warning" 
                id="inputEmail4" 
                type="email" 
                name="email" 
                required/>
                </div>
        
                <div className="col-12">
                <label className="form-label text-warning" 
                htmlFor="inputPassword4" >Password: </label>
                <input 
                className="form-control" 
                id="inputPassword4" 
                type="password" 
                name="password" 
                required/>
                </div>
                <div className="col-12">
                <label className="form-label text-warning" 
               htmlFor="inputPassword4" >Confirm Password: </label>
                <input 
                className="form-control" 
                id="inputPassword4" 
                type="password" 
                name="confirmPassword" 
                required/>
                </div>
        
                <input className="btn btn-primary my-3" type="submit" value="Register"/>
            </form>
        </div>
    )
}
