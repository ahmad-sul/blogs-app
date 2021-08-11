import React from 'react'



export default function Navbar({user}) {
//  console.log('Vavbaaaaaaaaaar',user)
 const onLogout=()=>{
   localStorage.removeItem('token')
   localStorage.removeItem('userId')
   window.location.replace('/')
 } 

    // const userId =localStorage.getItem('userId')
    
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-dark rounded">
           <div className="container-fluid align-items-start">
    <a className="navbar-brand text-white" href="/">BLOGS</a>
    <button className="navbar-toggler bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-start " id="navbarSupportedContent">
      <ul className="navbar-nav  mb-2  ">
        <li className="nav-item me-2">
          <a className="nav-link active  text-white" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item me-2">
          <a className="nav-link  text-white" href="/about">ABOUT</a>
        </li>
           <li className="nav-item me-2">
          <a className="nav-link  text-white" href="/blogs">BLOGS</a>
        </li>
      

        {!user && (
            <li className="nav-item me-5">
          <a className="nav-link  text-white" href="/login">LOGIN</a>
        </li>
        )}
    

        {user && (
         <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-light  d-flex  align-items-center" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {user.userName}<img className='ms-3 navimg' src={user.avatar} alt="img" width='7%' height='4%'/>
          </a>
       
           <ul className="dropdown-menu text-white" aria-labelledby="navbarDropdown">
             <li><a className="dropdown-item" href="/profile">Profile</a></li>
             <li><a className="dropdown-item" href="/myblogs">My Blogs</a></li>
             {user.isAdmin && (
                <li><a className="dropdown-item" href="/allBlogs">All Blogs</a></li>
             )}
               {user.isAdmin && (
                <li><a className="dropdown-item" href="/allUsers">All Users</a></li>
             )}
             <li>
               <li className="dropdown-item" onClick={onLogout}>
               <a className="dropdown-item" href="/login">Logout</a>  
                </li> 
             </li>
           </ul>
         </li>

      )}
      
      </ul>
    </div>
  </div>
</nav>
        </div>
    )
}

 