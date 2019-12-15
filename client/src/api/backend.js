import axios from "axios";

let token = localStorage.getItem("token");

export default axios.create({
  /* baseURL: "http://localhost:5000/" */
  /* ,
  headers: { authorization: "Bearer " + token } */
});
