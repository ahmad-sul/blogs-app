import React, { useState } from "react";
import MyContext from "./MyContext";

export default function Container(props) {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [register, setRegister] = useState(false);

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        isLogin,
        setIsLogin,
        register,
        setRegister,
        error,
        setError,
        success,
        setSuccess,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
