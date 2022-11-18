import React from 'react'
import { Outlet } from 'react-router'
import user from "../imgs/user.png"
import rutinas from "../imgs/icons/clock.png"
import progreso from "../imgs/icons/star.png"
import play from "../imgs/icons/play.png"
import '../css/layaout.css'
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

export default function Layaout() {
  return (

    <div className='layoutBody'>
        <div className='nav'>
            <div className="image">
                <div>
                    <img src={user} alt="USER" className="iconlike" />
                </div>
            </div>
            <hr />
            <NavLink to='/rutinas'>
                <div className="icon icon1">
                    <div className="iconlike-div">
                        <img src={rutinas} alt="Rutinas" className="iconlike" />
                    </div>
                </div>
            </NavLink>
            <NavLink to='/record'>
                <div className="icon icon2">
                    <div className="iconlike-div">
                        <img src={progreso} alt="Progreso" className="iconlike" />
                    </div>
                </div>
            </NavLink>
        </div>
        <Outlet />
    </div>
  )
}
