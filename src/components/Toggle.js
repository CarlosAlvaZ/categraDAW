import React, { useContext } from 'react'
import { userContext } from '../App'
import '../css/toggle.css'

export default function Toggle({id, update}) {

  const userId = useContext(userContext)

  function removeCard() {
    fetch(`https://catedradaw.herokuapp.com/data/routines/user/${userId}/id/${id}`, {
      method: 'DELETE',
    }).then(res=>res.json()).then(res=>update()).catch(err=>console.log(err))
  }
  return (
    
    <div className="options hidden">
        <div className="option danger eliminate" onClick={removeCard}>
            <span>Eliminar</span>
        </div>
        <div className="option edit">
            <span>Editar</span>
        </div>
    </div>
  )
}
