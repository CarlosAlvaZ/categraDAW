import React from 'react'
import play from "../imgs/icons/play.png"
import '../css/listElement.css'

export default function ListElement({nombre, duracion, draggStartHandler, draggEndHandler, draggingState}) {
  return (
    <div className="list-element" draggable onDrag={e => draggStartHandler(e)} onDragEnd={e => draggEndHandler(e)}>
        <div className="data">
            <h2 className="e-name">{nombre}</h2>
            <h3 className="e-duration">{duracion}</h3>
        </div>
        <div className="play hidden">
            <img src={play} alt="Empezar" />
        </div>
    </div>
  )
}
