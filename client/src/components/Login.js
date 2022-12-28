import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthConsumer } from './AuthProvider'


export default function Login() {

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const value = AuthConsumer();

    const handleSubmit = async(e)=> {
        e.preventDefault();


        const config = {
            header: {
                "content-type": "application/json",
            },
        };
        await axios.post("http://localhost:8000/api/user/login", form,config)
        .then((res) => {
            if(res.data.token !== undefined) {
                value.setValue(res.data.token)
                value.setId(res.data.user)
                // console.log(res.data)
                navigate("/home")
            }
        })
    }

    return (
        <div className='loginComp'>

            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
                <input type="email" name="email" id="email" placeholder='enter email' value={form.email} onChange={(e) => {
                    setForm({ ...form, email: e.target.value })

                }} autoComplete="off" />

                <input type="password" name="password" id="password" placeholder='enter password' value={form.password} onChange={(e) => {
                    setForm({ ...form, password: e.target.value })
                }} autoComplete="off" />

                {/* <input type="password" name="password" id="password" placeholder='enter password' value={form.password} onChange={(e) => {
                    setForm({ ...form, password: e.target.value })
                }} autoComplete="off" /> */}

                <button type='submit'>Signup</button>
            </form>

        </div>
    )
}
