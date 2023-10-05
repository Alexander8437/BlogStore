import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext.js'

const Login = () => {
    const [inputs, setInput] = useState({
        username: "",
        password: ""
    })

    const [err, setErr] = useState(null)
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs)
            // axios.post("http://localhost:8801/api/auth/login", inputs);
            navigate("/");
        } catch (err) {
            setErr(err.response.data)
        }
    }


    return (
        <div className='auth'>
            <h2>Login</h2>
            <Form>
                <input required type="text" placeholder='enter email...' name='username' onChange={handleChange} />
                <input required type="password" placeholder='enter password...' name='password' onChange={handleChange} />
                <button type='button' onClick={handleSubmit}>Submit</button>
                {err && <p>{err}</p>}
                <span>Don't have an account? <Link to="/register">Register</Link>
                </span>
            </Form>
        </div>
    )
}

export default Login