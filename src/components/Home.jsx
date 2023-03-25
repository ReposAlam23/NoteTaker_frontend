import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import axios from 'axios'
import "./Home.css"
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    // const userid = JSON.parse(localStorage.getItem())

    const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(false)
    const [popup, setPopup] = useState()

    
    const fetchData= async()=>{
        let data = await axios.get("http://localhost:3004/v1//notes")
        setList(data.data)
        userid = 
        // console.log(list)
        console.log(data.data)
    }
    let userid = fetchData.data
    console.log(userid)


    const fetchSearchedData =async()=>{
        // let data = await axios.get(`http://localhost:3004/v1/notes/search/:${userid}/:${search}`)
        // // setList(data.data)
        // console.log(data)
        // // console.log(list)
        // console.log(data.data, list)
    }

    useEffect(()=>{
        fetchSearchedData()
    },[search])

    const handleNotes = ()=>{
        setShow(true)
    }

    useEffect(()=>{
        fetchData()
    }, [])

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

  return (
    <div>
        <Nav />

        <div className='d-flex justify-content-center m-4'>
            <input placeholder='Search !' className='search' value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>
        <div>
            {list && list.map((elem, i)=>{
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
            <div>
                <h1>Title</h1>
            </div>


        </div> 
        : ""}





        


        
    </div>
  )
}

export default Home