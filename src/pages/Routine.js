import React, { useState, useContext, useEffect } from 'react'
import ListElement from '../components/ListElement'
import CreateNew from '../components/CreateNew'
import background from "../imgs/background1.jpeg"
import editGray from "../imgs/icons/edit_gray.png"
import editGreen from "../imgs/icons/edit_green.png"
import add from "../imgs/icons/add.png"
import trashCan from "../imgs/icons/trash_can.png"
import { userContext } from '../App'
import { useParams } from 'react-router-dom'
import '../css/routine.css'

export default function Routine() {
    const currentUser = useContext(userContext)
    const [editting, setEditting] = useState(false)
    const [creating, setCreating] = useState(false)
    const [draggingState, setDraggingState] = useState({dragging: false, draggingOverRemoveElement: false, draggedElement: null})
    const [data, setData] = useState({elementos:[]})
    const params = useParams()
    
    function getRoutines() {
        console.log(currentUser)
        fetch(`https://catedradaw.herokuapp.com/data/routines/${currentUser}`)
            .then(res=>res.json()).then(res=>{
                console.log(res.data[params.id].elementos.map(element => element))
                console.log(params.id)
                const data = res.data
                const index = data[params.id]
                setData(index)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        getRoutines()
    }, [creating, draggingState.dragging])

    function changeEdittingState() {
        setEditting(prev => !prev)
    }

    function draggStartHandler(e) {
        setDraggingState(prev => {
            return {...prev, dragging: true, draggedElement: e.target}
        })
    }

    function draggEndHandler(e) {
        if(draggingState.draggingOverRemoveElement){
            console.log(true)
        } else {
            console.log(false)
        }
        setDraggingState(prev => {
            return {...prev, dragging: false, draggedElement: null}
        })
    }

    function draggOverHandler(e) {
        e.preventDefault()
        setDraggingState(prev => {
            return {...prev, draggingOverRemoveElement: true}
        })
    }

    function draggOutHandler(e) {
        setDraggingState(prev => {
            return {...prev, draggingOverRemoveElement: false}
        })
    }

    console.log(data)
  return (
    <main>
        <div className="banner">
            <img src={background} alt="Banner" />
        </div>

        <div className="titles">
            { !editting && <h1 className="name">{data.nombre_rutina}</h1> }
            { editting && <input type="text" className="i-name hidden" />}
            {!editting && <img src={editGray} alt="Editar" className="edit" onClick={changeEdittingState}/>}
            {editting && <img src={editGreen} alt="Editar" className="edit" onClick={changeEdittingState}/>}
        </div>

        <div className="routineList">

            { data.elementos.map(element=>{
                return <ListElement nombre={element.nombre} duracion={element.duracion} draggStartHandler={e => draggStartHandler(e)} draggEndHandler={e => draggEndHandler(e)} draggingState={draggingState.dragging}/>
            })}
            
            {(editting && creating) && <CreateNew close={changeEdittingState}/>}
        </div>

        <div className="icons">
            { (editting && !draggingState.dragging) && 
            <div className="add hidden" onClick={e => setCreating(prev => !prev)}>
                <img src={add} alt="Añadir" />
            </div>}
            
            { draggingState.dragging && <div className="trash hidden">
                <img src={trashCan} alt="Eliminar" onDragOver={e=>draggOverHandler(e)} onDragLeave={e=>draggOutHandler(e)}/>
            </div>}
        </div>
    </main>
  )
}
