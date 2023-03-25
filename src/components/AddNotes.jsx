import React, { useState } from 'react'
import "./AddNotes.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddNotes() {
    const navigate = useNavigate()
    const [form, setForm] = useState({title:"", description:""})

    const AddNotes= async(e)=>{
        e.preventDefault()
        try{
            const data = await axios.post("https://notetaker-backend.onrender.com/v1/notes/addnotes", form)
            console.log(data)
            setTimeout(()=>{
                navigate("/home")
            }, 1000)
        } catch(e){
            console.log(e);
        }
    }

  return (
    <div className='form-div'>
         <button className='m-2' onClick={()=>navigate("/home")}>back</button>
        <form onSubmit={(e)=>{AddNotes(e)}} className='d-flex flex-column justify-content-center align-items-center mt-5 p-5'>
            <div className='m-2'>
                <label htmlFor='title' className='titl'>Title</label><br></br>
                <input className='title-input' required value={form.title} id='title' name='title' onChange={(e)=>setForm({...form, title: e.target.value})}/>
            </div>
            <div className='m-1'>
                <label htmlFor='description' className='descrp'>Description</label> <br></br>
                <textarea className='des-input' required value={form.description} id='description' name='description' onChange={(e)=>setForm({...form, description: e.target.value})}></textarea>
            </div>
            <button className='btn bg-success' type='submit'>Add</button>
        </form>


    </div>
  )
}

export default AddNotes