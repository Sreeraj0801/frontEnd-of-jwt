import React from 'react'
import { useNavigate ,Link} from "react-router-dom";
import { useCookies } from 'react-cookie'

function Navbar() {
const navigate = useNavigate();
const [cookies, setCookie, removeCookie] = useCookies([]);
const logOut = () => {
  removeCookie('adminCookie');
  navigate('/adminLogin');
}
  return (
    <div>
            <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Admin Page
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link " aria-current="page" onClick={()=>{
                    navigate('/adminhome')
                  }} 
                  style={{cursor:'pointer'}}>
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" onClick={() =>{
                    navigate('/adminusers')
                  }}
                  style={{cursor:'pointer'}}
                  >
                    viewUsers
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <button type="button" className="btn btn-outline-danger me-5" onClick={logOut}>Logout</button>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
