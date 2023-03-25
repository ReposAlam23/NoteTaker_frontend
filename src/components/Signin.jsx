import React, { useState } from 'react'
import "./Signup.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios'

function Signin() {
    const navigate = useNavigate()   

    const [form, setForm] = useState({email:"", password:""})
    const [error, setError] = useState({status: "", message:""})

    const submitHandler=(e)=>{
        e.preventDefault()
        console.log(form);

        const SignIndata = async()=>{

            let data = await axios.post("https://notetaker-backend.onrender.com/v1/signin", form)        
                console.log(data, data.data)
                if(data.data.status == "failed"){ 
                    console.log("in")
                    setError({...error, message: data.data.message})
                    return 
                } else{
                    setError({...error, message: ""})
                }
                alert("user Registered successfully")
                setTimeout(()=>{
                    navigate("/home")
                },1000)
        }
        SignIndata()  
    }

  return (
    <div className='container col-6 bg-secondary mt-3'>
        <div className='d-flex'>
            <button className='btn bg-white' onClick={()=>navigate("/signup")}>Go to signUp</button>
            <h1>SIGN IN FORM</h1>
        </div>
        <form className='mb-0 form d-flex flex-column justify-content-center align-items-center m-4' onSubmit={(e)=>submitHandler(e)}>
           
            <div >
                <label htmlFor='email' className='text-white' >Email</label><br></br>
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
                <label htmlFor='password' className='text-white'>Password</label><br></br>
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
                <input type="checkbox" required /> <span style={{color: "white"}}>Remember me</span>
            </div>
            <button type='submit' className='btn btn-danger text-center'>Sign in</button>
        </form>

        {/* ERROR HANDELLING */}
        <div className='p-4 mt-0'>
            <h6 style={{color: "red"}}>{error.status}</h6>
            <h6 style={{color: "red"}}>{error.message}</h6>
        </div>

    </div>
  )
}

export default Signin