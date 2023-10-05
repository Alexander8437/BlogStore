import React from 'react'
import logo from '../images/logo.jpg'

const Footer = () => {
  return (
    <footer>
      <img className='logo' src={logo} alt="" />
      <span>@copywrite 2023</span>
    </footer>
  )
}

export default Footer