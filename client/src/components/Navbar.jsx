import React, { useContext } from 'react'
import logo from '../images/logo.jpg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext.js'

const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          {currentUser ? (<span className='profile'> {currentUser?.username} </span>) : <></>}
          {
            currentUser ? (<Link to='/login'><button onClick={logout}>Logout</button></Link>) :
              (<Link to="/login">
                <button>Login</button>
              </Link>)}
          <span className='write'>
            <Link className="link" to="/write">Write</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar