import React, { useState } from 'react'
import check from "../imgs/icons/check.png"
import cancel from "../imgs/icons/cancel.png"
import '../css/createNew.css'

export default function CreateNew({close}) {
    const [newElement, setNewElementData] = useState({name: '', duration: ''})

    function handleSubmit(e){
        e.preventDefault()
        console.log(newElement)
    }

    function setData(e){
        setNewElementData(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

  return (
    <form className="list-element new" onSubmit={e => handleSubmit(e)}>
        <div className="data new-data">
            <input className="new-name" type="text" placeholder="Nombre de Nuevo Ejercicio" name='name' value={newElement.name} onChange={e=>setData(e)} required/>
            <input className="new-duration" type="number" placeholder="Duracion de Nuevo Ejercicio (min)" min="0" name='duration' value={newElement.duration} onChange={e=>setData(e)} required/>
        </div>
        <div className="buttons">
            <div className="done ">
                <button type='submit' >
                    <img src={check} alt="Hecho" />
                </button>
            </div>
            <div className="cancel">
                <button onClick={close}>
                    <img src={cancel} alt="Cancelar" />
                </button>
            </div>
        </div>
    </form>
  )
}
