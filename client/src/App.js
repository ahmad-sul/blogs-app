import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Blogs from "./component/Blogs";
import Login from "./component/Login";
import Register from "./component/Register";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Profile from "./component/Profile";
import Singleblog from "./component/Singleblog";
import MyBlogs from "./component/MyBlogs";
import EditBlog from "./component/EditBlog";
import AllBlogs from "./component/AllBlogs";
import AllUsers from "./component/AllUsers";
import Container from "./context/Container";
import axios from "axios";
import baseURL from "./config/baseURL";
import setAuth from "./config/AuthSetting";
import CreateBlog from "./component/CreateBlog";

export default function App() {
  const [user, setUser] = useState();

  const getUser = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const userData = await axios.get(baseURL + "users/" + userId);
      // console.log(userData);
      setUser(userData.data);
    }
  };
  const setAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(token);
    }
  };
  useEffect(() => {
    getUser();
    setAuthToken();
  }, []);

  return (
    <Container>
      <BrowserRouter>
        <div className="App">
          <Navbar user={user} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/blogs" component={Blogs} />
            <Route path="/register" component={Register} />
            <Route path="/singleblog/:id" component={Singleblog} />
            <Route path="/profile" component={Profile} />
            <Route path="/editBlog/:id" component={EditBlog} />
            <Route path="/allBlogs" component={AllBlogs} />
            <Route path="/allUsers" component={AllUsers} />
            <Route path="/myblogs">
              <MyBlogs user={user} />
            </Route>

            <Route path="/createblog" component={CreateBlog} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </Container>
  );
}
