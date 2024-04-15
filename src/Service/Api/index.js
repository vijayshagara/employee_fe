import axios from "axios";

const instance = axios.create({
  baseURL: `/api`,
  timeout: 20000,
  headers: {
    "content-Type": "application/json",
  },
});

export const setAuthHearders = ({accessToken})=>{
  if(accessToken){
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }else{
 
  }
 }

export default instance;
