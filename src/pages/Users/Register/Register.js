import React , {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'
import './Register.css'


function Register() {
  const navigate = useNavigate();
  //state for storing email and password.
  const [values,setValues] = useState({
    email:"",
    password:""
  });

  const generateError = (err) => toast.error(err,{
    position:'top-right',
  });
const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    const {data} = await axios.post("http://localhost:4000/register",{
      ...values,
    },{
      withCredentials:true,
    });
    if(data) {
      if(data.errors){
        console.log(data);
        const {email,password} = data.errors;
        if(email) generateError(email);
        else if(password) generateError(password)
      }
      else {
        navigate('/')
      }
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div id="register-body">
        <div className="container-body">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={(e)=>{
              setValues({...values , [e.target.name]: e.target.value})
            }}
          />
        </div>
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
        <span>
          Already have an account ?<Link to="/login"> Login</Link>
        </span>
      </form>
      <ToastContainer/>
       </div>
       </div>  
  )
}

export default Register
