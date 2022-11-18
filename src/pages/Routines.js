import React, { useState, useEffect, useContext } from 'react'
import Card from '../components/Card'
import banner from "../imgs/background1.jpeg"
import add from "../imgs/icons/add.png"
import { Link } from "react-router-dom"
import { userContext } from '../App'
import '../css/routines.css'

export default function Routines() {
    const [data, setData] = useState([])
    const [create, setCreate] = useState({creating: false, name: ""})
    const currentUser = useContext(userContext)

    function getRoutines() {
        console.log(currentUser)
        fetch(`https://catedradaw.herokuapp.com/data/routines/${currentUser}`)
            .then(res=>res.json()).then(res=>{
                console.log(res.data[0].elementos)
                setData(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        getRoutines()
    }, [create.creating])

    function setCreateData(value){
        setCreate(prev => {
            return {...prev, name: value}
        })
    }

    function createNew(e) {
        e.preventDefault()
        const newRoutineData = {
            nombre_rutina: create.name,
            elementos: [],
        }
        fetch(`https://catedradaw.herokuapp.com/data/routines/${currentUser}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newRoutineData)
        }).then(res=>res.json()).then(res=>getRoutines())
          .catch(err=>console.log(err))
        
        setCreate({creating: false, name: ""})
    }

  return (
    <div className='routinesMain'>
        <div className="banner">
            <img src={banner} alt="Banner" />
        </div>

        <div className="greeting">
            <h4 className="greeting-target">Bienvenido</h4>
        </div>

        <div className="title">
            <h1>Rutinas</h1>
        </div>

        <div className="cards">
            {data.map((rutina, i) => {
                return <Card  key={i} id={i} title={rutina.nombre_rutina} duration={rutina.elementos.reduce( (prev, element) => parseFloat(element.duracion) + prev, 0 )} update={getRoutines}/>
            }) }
            

        </div>

        

        <hr />
        <div className="create">
            { create.creating && <form className='createForm' onSubmit={e=>createNew(e)}>
                <input placeholder='Nombre de nueva rutina' value={create.name} onChange={e=>setCreateData(e.target.value)} style={{padding: "10px", fontSize:"18px", width: "400px"}} required/> 
                <button style={{padding: "10px", fontSize:"18px", width: "400px", backgroundColor:"var(--pantone-c)"}} type='submit'>Crear</button>
            </form> }
            { !create.creating && <div onClick={e=>setCreate(prev=>{ return {...prev, creating: !prev.creating} })} className="icon">
                <img src={add} alt="Create" />
            </div>}
        </div>
    </div>
  )
}
