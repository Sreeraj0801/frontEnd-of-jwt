import React,{useState,useEffect} from 'react';
import axios from 'axios';
import AdminHeader from '../../../Components/Admin/Navbar'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'


function AdminUsers() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [users,setUsers] = useState([])

    useEffect(async() => {
      if(!cookies.adminCookie){
        navigate('/adminLogin')
      }
      else{
        const {data} = await axios.get('http://localhost:4000/getUsers',{},{withCredentials:true})
        setUsers(data.details)
      }

    }, []);
    const deleteUser = async (id) => {
    const {data} = await axios.post('http://localhost:4000/deleteUser',{id},{withCredentials:true})
    if(data.status){
      setUsers(
        users.filter((user)=>{
          if(user._id !== id)
          {
            return user
          }
        })
      )
    }
    }

    const editUser = async (id) => {
      navigate(`/userEdit/${id}`)
    }
    return (
        <div className="">
          <AdminHeader/>
                <div className="container mt-5">
                <table class="table">
          <thead class="thead-dark table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">userName</th>
              <th scope="col">Email</th>
              <th scope="col">options</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user,index)=>{
                return(
                  
                   <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className='d-flex'>
                  <h3 className='bi bi-pencil-square text-primary' style={{cursor:"pointer"}} onClick={() =>{editUser(user._id)}}></h3>
                  <h3 className='bi bi-x-circle text-danger ms-5' style={{cursor:"pointer"}} key={user._id} onClick={()=>{
                    deleteUser(user._id)
                  }}></h3>
                </td>
              </tr>
                )
              })
            }
          </tbody>
        </table>
                </div>
            </div>
          )
}

export default AdminUsers
