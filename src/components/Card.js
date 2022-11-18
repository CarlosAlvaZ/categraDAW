import React, { useState } from 'react'
import Toggle from './Toggle'
import play from "../imgs/icons/play.png"
import options from "../imgs/icons/three_points.png"
import '../css/card.css'
import { Link } from 'react-router-dom'

export default function Card({title, duration, id, update}) {
    const [toggle, setToggle] = useState(false)

  return (
    <div className="card">
        <div className="cardImage"></div>

        <div className="content">
            <div className="text">
                <h2 className="title">{title}</h2>
                <h4 className="duration">{duration}</h4>
            </div>
            <div className="start">
                <Link to={`/rutinas/${id}`} >
                    <div>
                        <img src={play} alt="Iniciar" />
                    </div>
                </Link>
            </div>
        </div>

        <div className="toggle">
            <div className="toggler" onClick={e => setToggle(prev => !prev)}>
                <img src={options} alt="Options" />
            </div>
            {toggle && <Toggle id={id} update={update}/>}
        </div>
        
    </div>
  )
}
