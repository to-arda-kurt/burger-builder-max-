import axios from "axios";

require("dotenv").config();

const instance = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_URL,
});

export default instance;
