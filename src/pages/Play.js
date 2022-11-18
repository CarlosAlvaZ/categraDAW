import React, { useEffect, useState } from 'react'
import close from '../imgs/icons/cancel.png'
import play from "../imgs/icons/play.png"
import pause from "../imgs/icons/pause.png"
import "../css/play.css"

export default function Play() {
    const [timer, setTimer] = useState(0)

    function startTimer(time) {
        setTimer(time)
        setInterval(()=>{
            if(timer == 0){
                console.log("ended")
                clearInterval()
            } else {
                setTimer(prev => prev - 1)
            }
        }, 1000)
    }

    useEffect(()=>{
        startTimer(10)
    })

  return (
    <div className='playMain'>
        <div className='close'>
            <img src={close} alt="Close" />
        </div>
        <h2 className='nombreEjercicio'>Ejercicio Ejemplo</h2>
        <h1 className='contador'>{timer}</h1>
        <div className='buttons'>
            <button >Anterior</button>
            <button className="pause"><img src={pause} /></button>
            <button> Saltar</button>
        </div>
    </div>
  )
}
