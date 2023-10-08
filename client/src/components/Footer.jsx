import React from 'react'
import logo from '../images/logo.jpg'

const Footer = () => {
  return (
    <footer>
      <img className='logo' src={logo} alt="" />
      <div className="copyright">
        <span>@copywrite 2023</span>
      </div>
    </footer>
  )
}

export default Footer