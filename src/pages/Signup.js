import React, { useRef, useState } from 'react'
import { Form, Card, Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
 
export default function Signup({currentUser, setCurrentUser}) {

    const [data, setUserData] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    function setData(e) {
        setUserData(prev => {
           return {...prev, [e.target.name] : e.target.value}
        }) 
    }

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        if(data.password != data.passwordConfirm) {
            return
        } else {
            const userData = {
                usuario: data.name,
                registro: Date.now(),
                record: [],
                rutinas: [],
                imc: 0,
                password: data.password
            }
            console.log(userData)
            fetch("https://catedradaw.herokuapp.com/data/", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then(res=>res.json()).then(res => {
                setCurrentUser(res.data._id)
                navigate("/registro", { replace: true })
            })
              .catch(err=>console.log(err))
        }
        setLoading(false)
    }

  return (
    <Container className='d-flex align-items-center justify-content-center' style={ { minHeight: "100vh", width: "100%"} }>
        <div className='w-100' style={ { maxWidth : '400px', minWidth: '200px' } }> 
            <Card style={{width:"100%", margin: "auto"}}>
                <Card.Body >
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-center mb-4'>Registrarse</h2>
                        <Form.Group id="email">
                            <Form.Label >Usuario</Form.Label>
                            <Form.Control type="text" name='name' value={data.name} onChange={e=> setData(e)} required />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label >Contraseña</Form.Label>
                            <Form.Control type="password" name='password' value={data.password} onChange={e=> setData(e)} required />
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label >Confirmar Contraseña</Form.Label>
                            <Form.Control type="password" name='passwordConfirm' value={data.passwordConfirm} onChange={e=> setData(e)} required />
                        </Form.Group>

                        <Button className='w-100 ' type="submit" disabled={loading}>Registrarse</Button>
                    </form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link> 
            </div>
        </div>
    </Container>
  )
}
