import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Nav.css"
import axios from "axios"

function Nav(props) {
    const navigate = useNavigate()

    let ids = []
    props.data.map(ele=>ids.push(ele._id))
    
    const handleDelete=async()=>{ 
        const data = {ids: ids}      
        console.log(data)
            let deletedData = await axios.delete("https://notetaker-backend.onrender.com/notes/deleteAll")
            console.log(deletedData)
            // navigate("/")
    }

  return (
    <div>
        <div className='li-div'>
            <ul>
                <li className='li' onClick={()=>navigate("/home")}>Home</li>
                <li className='li' onClick={()=>navigate("/addnotes")}>AddNotes</li>
                <li className='li' onClick={handleDelete}>DeleteAll</li>
                <li className='li'>Export</li>
                <button className='m-0' onClick={()=>navigate("/")}>Logout</button>
            </ul>
        </div>      
    </div>
  )
}

export default Nav