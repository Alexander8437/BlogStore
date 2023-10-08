import React, { useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = () => {
    const [inputs, setInput] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [err,setErr] = useState(null)
    const navigate = useNavigate();

    const handleChange = e => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://blog-store-frontend.vercel.app/api/auth/register", inputs);
            navigate("/login");
        } catch (err) {
            setErr(err.response.data)
        }
    }
    return (

        <div className='auth'>
            <h2>Register</h2>
            <Form>
                <input required type="text" placeholder='username...' name="username" onChange={handleChange} />
                <input required type="email" placeholder='enter email...' name="email" onChange={handleChange} />
                <input required type="password" placeholder='password' name="password" onChange={handleChange} />
                <button type='button' onClick={handleSubmit}>Submit</button>
                {err && <p>{err}</p>}
                <span>Already register? <Link to="/login">Login</Link>
                </span>
            </Form>
        </div>
    )
}

export default Register