import React, { useContext } from "react";
import baseURL from "../config/baseURL";
import MyContext from "../context/MyContext";

export default function Login() {
  const { error, setError, success, setSuccess } = useContext(MyContext);
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.elements["email"].value;
    const password = e.target.elements["password"].value;

    const user = {
      email,
      password,
    };
    console.log("Sign up date ==>", user);
    fetch(baseURL + "users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (result.success) {
          console.log(result.data);
          localStorage.setItem("token", result.token);
          localStorage.setItem("userId", result.userId);
          setError(null);
          setSuccess(
            `Welcome ${result.data.userName} registered successfully, redirect in 3s`
          );
          setTimeout(() => {
            window.location.replace("/");
          }, 3000);

          console.log("import user :", user);
        } else {
          setError("NO such user found in DB. Email or password is invalid");
          setSuccess(null);

          console.log(result.message);
        }
      });
  };

  return (
    <div className="login d-flex  flex-column align-items-center  height login">
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
      <form
        className="d-flex  flex-column align-items-center   w-50 mt-5 "
        action="/login"
        method="POST"
        onSubmit={submitHandler}
      >
        <input
          className="form-control  w-50 m-3"
          type="email"
          name="email"
          aria-label="email"
          id="inputEmail3"
          placeholder="email"
          required
        />

        <input
          type="password"
          className="form-control w-50 m-3"
          name="password"
          aria-label="password"
          id="inputPassword3"
          placeholder="Password"
          required
        />

        <input
          className="btn btn-primary w-50 mt-3 "
          type="submit"
          value="login"
        />

        <button className="btn btn-success  w-50 m-3">
          <a className="nav-link text-white" href="/register">
            Register now
          </a>
        </button>
      </form>
    </div>
  );
}
