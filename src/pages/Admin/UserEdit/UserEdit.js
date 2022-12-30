import React,{useState,useContext,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';

function UserEdit() {
  const navigate = useNavigate();
  const [userDetails,setUserDetails] = useState({});
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');



  const {id} = useParams();
  useEffect(async() => {
   const {data} = await axios.post(`http://localhost:4000/edituser/`,{id},{withCredentials:true});
   setUserDetails(data);
   if(data._id){
    setEmail(data.email);
    setName(data.name);
   }
  }, []);



  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:4000/doEditUser',{email,name,id},{withCredentials:true});
      if(data.status)
      {
        navigate('/adminHome')
      }
    } catch (error) {
      console.log(error);
    }
  }

    return (
        <div id="register-body">
            <div className="container-body">
          <h2>Edit user</h2>
          <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder={name}
                value={name}
                onChange={(e)=>{
                  setName(e.target.value)
                }}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}

              />
            </div>
            <button type="submit">Submit</button>
          </form>
           </div>
           </div>  
      )
}

export default UserEdit
