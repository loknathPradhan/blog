import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Signup() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [message , setMessage] = useState("");



    const handleSubmit= async(e)=> {
        e.preventDefault();
        

        const config = {
            header: {
                "content-type": "application/json",
            },
        };

       await axios.post("http://localhost:8000/api/user/register", form, config)
        .then((res) => {
            // console.log(res.data.message)
           setMessage(res.data.message);
        })
        
    }
    if(message === "Registration successfull") {
        navigate("/login")
        console.log("hellow regis")
    }

    return (

        
        <div className='container'>

            <h1>REGESTER</h1>
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
