import React from 'react'
import background from '../imgs/background1.jpeg'
import { CategoryScale } from 'chart.js'
import { Chart } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import '../css/record.css'
import { Link } from 'react-router-dom'

export default function Record() {

  Chart.register(CategoryScale)

  const data = {
    labels: ["Fecha 1", "Fecha 2", "Fecha 3", "Fecha 4"],
    datasets: [
      {
        id: 1,
        label: "Registro de IMC",
        fill: false,
        backgroundColor: "#148c3e",
        borderColor: "#148c3e",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#400200",
        pointRadius: 1,
        pointHitRadius: 10,
        data: [20, 30, 10, 23]
      }
    ]
  }

  return (
    <main>
        <div className="banner">
            <img src={background} alt="Banner" />
        </div>

        <div className="titles">
            <h1 className="name">Progreso</h1>
        </div>

        <div className="list">
          <div className='chart'>
            <Line data={data} /> 
          </div>
          <div className='data'>
            <div>
              <h3>IMC inicial: </h3><h4>Ejemplo</h4>
            </div>
            <div>
              <h3>IMC actual: </h3><h4> Ejemplo</h4>
            </div>
            <div>
              <Link to="/registro">Agregar otro registoro</Link>
            </div>
          </div>
        </div>

    </main>
  )
}
