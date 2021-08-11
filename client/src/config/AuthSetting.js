import axios from "axios";

const setAuthToken = async(token) => {
  console.log("setAuthToken ==> ", token);
  if (token) {
    // Apply to every request

    token = await axios.defaults.headers.common["Authorization"] ;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;