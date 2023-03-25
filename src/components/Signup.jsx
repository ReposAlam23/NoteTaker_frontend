import React, { useState } from 'react'
import "./Signup.css"
import {useNavigate} from "react-router-dom"
import axios from "axios"

function Signup() {
    const navigate = useNavigate()   

    const [form, setForm] = useState({username:"", email:"", password:"", repeat_password:""})
    const [error, setError] = useState({status: "", message:""})

    const submitHandler=(e)=>{
        e.preventDefault()

        if(form.password != form.repeat_password){
            setError({...error, message: "Password does not match with confirm pass"})
            return 
        } else{
            setError({status: "", message:""})
        }

        const Signupdata = async()=>{
            let data = await axios.post("https://notetaker-backend.onrender.com/v1/signup", form)        
                // console.log(data.data.status)
                if(data.data.status == "failed"){ 
                    setError({...error, message: data.data.message})
                    return 
                } else{
                    setError({...error, message: ""})
                }
                alert("user Registered successfully")
                setTimeout(()=>{
                    navigate("/")
                },1000)
        }
        Signupdata()
    }

  return (
    <div className='container col-6 bg-secondary mt-3'>
        <div className='d-flex'>
            <button className='btn bg-white' onClick={()=>navigate("/")}>Back to signIn</button>
            <h1>SIGN UP FORM</h1>
        </div>
        <form className='mb-0 form d-flex flex-column justify-content-center align-items-center m-4' onSubmit={(e)=>submitHandler(e)}>
            <div >
                <input 
                    className='p-2'
                    id="username"
                    required
                    name="username"
                    placeholder='username' 
                    value={form.username} 
                    onChange={(e)=>setForm({...form, username: e.target.value})} 
                />
            </div>
            <hr></hr>
            <div >
                <input 
                    id="email"
                    className='p-2'
                    name="email"
                    required
                    placeholder='email' 
                    value={form.email} 
                    onChange={(e)=>setForm({...form, email: e.target.value})} 
                />
            </div>
            <hr></hr>
            <div >
                <input 
                    id="password"
                    className='p-2'
                    required
                    name="password"
                    placeholder='password' 
                    value={form.password} 
                    onChange={(e)=>setForm({...form, password: e.target.value})} 
                />
            </div>
            <hr></hr>
            <div >
                <input 
                    id="repeat_password"
                    className='p-2'
                    required
                    name="repeat_password"
                    placeholder='repeat_password' 
                    value={form.repeat_password} 
                    onChange={(e)=>setForm({...form, repeat_password: e.target.value})} 
                />
            </div>
            <hr></hr>
            <div >
                <input type="checkbox" required /> <span style={{color: "white"}}>I agree with TERMS & CONDITIONS</span>
            </div>
            <button type='submit' className='btn btn-danger text-center'>Continue</button>
        </form>

        {/* ERROR HANDELLING */}
        <div className='p-4 mt-0'>
            <h6 style={{color: "red"}}>{error.status}</h6>
            <h6 style={{color: "red"}}>{error.message}</h6>
        </div>

    </div>
  )
}

export default Signup