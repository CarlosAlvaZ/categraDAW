import React, { useState , useContext} from 'react'
import logo from '../imgs/logo.png'
import '../css/registro.css'
import { useNavigate } from 'react-router'
import { userContext } from '../App'

export default function Record() {


    const currentUser = useContext(userContext) 

    

    const [data, setRecordData] = useState({gender: '', age: '', height: '', wheight: ''})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function setData(e) {
        setRecordData(prev => {
            return {...prev, [e.target.name] : e.target.value}
        })
    }

    function getDefaultRoutines(id){
        fetch(`https://daw-api.herokuapp.com/routines/${id}`)
            .then(res=>res.json()).then(res=>res.rutinas)
            .then(res=> {
                res.forEach(element => {
                    const data = {
                        nombre_rutina: element.nombreRutina,
                        elementos: element.contenido
                    }
                    console.log(data)
                    fetch(`https://catedradaw.herokuapp.com/data/routines/${currentUser}`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }).then(res=>res.json()).then(res=>console.log(res))
                      .catch(res=>console.log(res))
                });
            }).catch(err=>console.log(err))
    }

    function postRecord() {

        if(data.hUnit == "in") {
            data.height = parseFloat(data.height) * 2.54
        }
        if(data.wUnit == "lbs") {
            data.wheight = parseFloat(data.wheight) * 0.453592
        }

        const imc=  data.wheight / Math.pow(2,(data.height / 100))
        
        const record = {
            gender: data.gender,
            age: data.age,
            height: data.height,
            wheight: data.wheight
        }
        
        console.log(record)
        fetch(`https://catedradaw.herokuapp.com/data/record/${currentUser}`)
            .then(res => res.json()).then(res => {
                if(res.data.length == 0){
                    if(imc<18.5){
                        getDefaultRoutines(1)
                    } else if(imc < 24.9){
                        getDefaultRoutines(2)
                    } else {
                        getDefaultRoutines(3)
                    }
                } else {
                    fetch(`https://catedradaw.herokuapp.com/data/record/${currentUser}`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(record)
                    }).then(res=>res.json()).then(res=>console.log(res))
                      .catch(err=>console.log(err))
                }
            }).catch(err=>console.log(err))
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        
        postRecord()
        navigate("/rutinas")
    }
    
    console.log(currentUser)
  return (
    <div className='recordBody'>
        <form className='recordMain' onSubmit={handleSubmit}>
            <div className="image">
                <img src={logo} alt="IMAGE" />
            </div>
            <div className="title">
                <h1>Ingresa tus datos de salud:</h1>
            </div>
            <div className="group group1">
                <div className="input-div sex">
                    <h2>Sexo:</h2>
                    <select name="gender" id="gender" className="inputSex" value={data.gender} onChange={e=>setData(e)} required>
                        <option value="hombre">Hombre</option>
                        <option value="mujer">Mujer</option>
                    </select>
                </div>

                <div className="input-div age">
                    <h2>Edad:</h2>
                    <input type="number" min="1" max="100" className="inputAge" value={data.age} onChange={e => setData(e)} name="age" required/>
                </div>
            </div>

            <div className="group group2">
                <div className="input-div height">
                    <h2>Estatura</h2>
                    <input type="number" min="1" max="1000" className="inputHeight" name="height" value={data.height} onChange={e => setData(e)} required/>
                    <select name="hUnit" className="unit selectHeight" value={data.hUnit} onChange={e => setData(e)} required>
                        <option value="cm" defaultChecked>Cm</option>
                        <option value="in">In</option>
                    </select>
                </div>

                <div className="input-div wheight">
                    <h2>Peso:</h2>
                    <input type="number" min="1" max="1000" className="inputWheight" name='wheight' value={data.wheight} onChange={e => setData(e)} required/>
                    <select name="wUnit" className="unit selectWheight" value={data.wUnit} onChange={e => setData(e)} required>
                        <option value="kg" defaultChecked>Kg</option>
                        <option value="lbs">Lbs</option>
                    </select>
                </div>
            </div>

            <div className="date">
                <h3>Fecha de ingreso de datos: <span className="date-target"></span></h3>
            </div>

            <div className="button">
                <button type='submit' disabled={loading}>Registrar Datos</button>
            </div>
        </form>
    </div>
  )
}
