import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import './Cards.css'

function Secret() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const  [userName, setuserName] = useState('');
  const [profile,setProfile] = useState(null);
    //update image and show image
    const [image,setImage] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate('/login')
      }
      else {
        const {data}  = await axios.post("http://localhost:4000", {}, { withCredentials: true });
        if (!data.status) {
          removeCookie('jwt')
          navigate('/login')
        }
        else toast(`HI ${data.user.name} `, { theme: 'dark' })
        setuserName(data.user.name);
        setProfile(`http://localhost:4000/pictures/${data.user.image}`)
      }
    }
    verifyUser();
  }, [cookies, navigate, removeCookie,profile ])


  const logOut = () => {
    removeCookie('jwt');
    navigate('/register');
  }

  const submitImage = async(e) => {
    e.preventDefault();
    try {
      if(image!= null)
      {
        const formData = new FormData();
        formData.append('file',image);
        const {data} = await axios.post("http://localhost:4000/addImage",formData,{
          withCredentials:true
        })
  
        if(data) {
          if(data.errors){
          }
          if(data.imageUploaded)
          { 
            setProfile(data.image)
          }
        }
      }
      else {
        alert("for updating image is mandatory")
      }
        } catch (error) {
          console.log(error);
      
    }
  }


  return (
    <>
      <div className='container-fluid'>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid mb-5">
            <a class="navbar-brand" href="#">User Side</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
              </ul>
              <form class="d-flex">
                <span className='mx-5'>Hello {userName} &#128522; <button class="btn btn-outline-danger mx-5" type="submit" onClick={logOut}>Log Out</button></span>
                
              </form>
            </div>
          </div>
        </nav>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
        <div class="card ms-5">
            <img alt="Posts" width="200px" height="200px" src={profile} className='m-5'></img>            
            </div>
          </div>
        <div className="col-md-5">
        <div class="card  my-5">
            <div class="card-body">
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''} ></img>            
            </div>
          </div>
          <div className="m-5">
            <input type="file" onChange={(e) => {setImage(e.target.files[0])}} name='file' required/>
          </div>
          <button type="button" class="btn btn-outline-success" onClick={submitImage}>Update</button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Secret
