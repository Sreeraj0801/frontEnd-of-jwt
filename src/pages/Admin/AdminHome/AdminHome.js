import React,{useEffect } from "react";
import axios from "axios";
import AdminHeader from '../../../Components/Admin/Navbar'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

function AdminHome() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(async() => {
    if(!cookies.adminCookie){
      navigate('/adminLogin')
    }
    else{
      const {data} = await axios.post('http://localhost:4000/adminHome',{},{withCredentials:true,})    
    }
  },[]);

  return (
    <div className="">
      <AdminHeader/>
      <h1 className="text-warning d-flex justify-content-center mt-5">Welcome Admin</h1>
        </div>
      )

}

export default AdminHome;
