import React,{useState} from "react";
import {Routes,Route} from 'react-router-dom'
import { useCookies } from "react-cookie";


import Register from './pages/Users/Register/Register';
import Login from './pages/Users/Login/Login';
import Secret from './pages/Users/Cards/Cards';
import "react-toastify/dist/ReactToastify.css";

import AdminLogin from './pages/Admin/AdminLogin/AdminLogin'
import AdminHome from './pages/Admin/AdminHome/AdminHome'
import AdminUsers from './pages/Admin/AdminUsers/AdminUsers'
import UserEdit from './pages/Admin/UserEdit/UserEdit'



function App() {

  const [cookies] = useCookies([]);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Secret/>}/>

       <Route exact path ="/adminlogin" element={<AdminLogin/>}/>
       <Route exact path = '/adminHome' element = {<AdminHome/>}/> 
       <Route exact path = "/adminusers" element = {<AdminUsers/>} />
       <Route exact path = '/userEdit/:id' element = {<UserEdit/>} />
       </Routes>
    </div>
  );
}

export default App;
