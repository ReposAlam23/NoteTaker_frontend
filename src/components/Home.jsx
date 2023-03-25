import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import axios from 'axios'
import "./Home.css"
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(false)
    const [popup, setPopup] = useState({title:"", description:"", id:""})
    const [deleteflag, setDeleteFlag] = useState(false)

    
    const fetchData= async()=>{
        let data = await axios.get("https://notetaker-backend.onrender.com/v1//notes")
        setList(data.data)
        setDeleteFlag(false)
        setShow(false)
        // console.log(data.data)
    }

    const fetchSearchedData =async()=>{
        let data = await fetch(`https://notetaker-backend.onrender.com/v1/notes/:${search}`)
                        .then((value)=>value.json())
                        .then((val)=>setList(val.searchedNotes))
    }

    useEffect(()=>{
        fetchSearchedData()
    },[search])

    const handleDate=(tm)=>{
        let timeArr = tm.split("T")
        let date = timeArr[0]
        return date
    }
    const handleTime=(tm)=>{
        let timeArr = tm.split("T")
        let time = timeArr[1]
        return time
    }
    const handleBackPopup=()=>{
        setShow(false)
    }

    const handleNotes = (elem)=>{
        setShow(true)
        setPopup({...popup, title: elem.title, description: elem.description, id: elem._id})
    }

    const handleDelete= async(e)=>{
        try{
            const deleteID = e.target.value
            let res = await axios.delete(`https://notetaker-backend.onrender.com/v1/delete/:${deleteID}`)   
            setDeleteFlag(true)
        }catch(e){
            alert(e)
        }
    }
    useEffect(()=>{
        fetchData()
    },[deleteflag])

  return (
    <div>
        <Nav data={list}/>

        <div className='d-flex justify-content-center m-4'>
            <input placeholder='Search !' className='search' value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>
        <div>
            {list && list?.map((elem, i)=>{
                return <div className='note-div m-4' key={i} onClick={()=>handleNotes(elem)}>
                    <div className='time'>Date: {(handleDate(elem.createdAt))}  Time: {handleTime(elem.createdAt)}</div>
                    <div className='title'>Title: {elem.title}</div>
                    <div className='description'>Description: {elem.description}</div>
                </div>
            })}
        </div>

        {/* POP UP NOTES AFTER OPENING */}

        {show ? 
        <div className='popupdiv'>
            <button onClick={handleBackPopup}>back</button>
            <div className='p-3'>
                <h1>Title: {popup.title}</h1>
                <h5>Description: {popup.description}</h5>
                <button value={popup.id} onClick={(e)=>handleDelete(e)}>Delete</button>
                <button >Update</button>
            </div>

        </div> 
        : ""}





        


        
    </div>
  )
}

export default Home