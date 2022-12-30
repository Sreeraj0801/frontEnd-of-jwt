import React,{useState} from 'react'
import './AdminLogin.css';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify'
import { Navigate,useNavigate } from 'react-router-dom';



function AdminLogin() {
  const navigate = useNavigate()
  const [values,setValues] = useState({
    email:"",
    password:""
  });

  const generateError = (err) => toast.error(err,{
    position:'top-right',
  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      console.log({...values});
      const {data} = await axios.post('http://localhost:4000/adminLogin',{...values},{withCredentials:true})
      if(data.admin){
        navigate('/adminHome')
      }
      else if(data.errors){
        generateError("Invalid credentials")
      }
    } catch (error) {
      console.log(error);
    }
  }

    return (
        <div className="adminloginbody" id='adminloginbody'>
        <div className="container-admin-body">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e)=>{
                  setValues({...values , [e.target.name]: e.target.value})
                }}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e)=>{
                  setValues({...values , [e.target.name]: e.target.value})
                }}
                />
            </div>
            <button type="submit">Submit</button>
          </form>
          <ToastContainer/>
         </div>
        </div>
      )
}

export default AdminLogin
