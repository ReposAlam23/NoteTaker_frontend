import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Nav.css"
import axios from "axios"

function Nav() {
    const navigate = useNavigate()

    const handleDelete=()=>{

        const Delete= async()=>{
            let deletedData = await axios.delete("https://notetaker-backend.onrender.com/notes/deleteAll")
            console.log(deletedData)
            navigate("/")
        }
        Delete()
    }

  return (
    <div>
        <div className='li-div'>
            <ul>
                <li className='li' onClick={()=>navigate("/")}>Home</li>
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