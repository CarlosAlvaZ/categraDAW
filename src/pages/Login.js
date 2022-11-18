import React, { useState } from 'react'
import { Form, Card, Button, Container, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
 
export default function Login({setCurrentUser}) {

    const [error, setError] = useState({error:false, content:''})
    const navigate = useNavigate()

    const [data, setUserData] = useState({})
    function setData(e) {
        setUserData(prev => {
            return {...prev, [e.target.name] : e.target.value}
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`https://catedradaw.herokuapp.com/data/user/${data.name}/password/${data.password}`).then(res=>res.json()).then(res=>{
            if(res.data.valid){
                setCurrentUser(res.data.id)
                navigate("/rutinas", {replace: true})
            } else {
                setError({error: true, content: "El usuario o contraseña son incorrectos"})
            }
        }).catch(err=>console.log(err))
    }

  return (
    <Container className='d-flex align-items-center justify-content-center' style={ { minHeight: "100vh" } }>
        <div className='w-100' style={ { maxWidth : '400px' } }> 
            <Card style={{width:"100%", margin: "auto"}}>
                <Card.Body>
                    <form onSubmit={handleSubmit}>
                            <h2 className='text-center mb-4'>Iniciar Sesión</h2>
                            { error.error && <Alert variant="danger">{error.content}</Alert> }
                            <Form.Group id="email">
                                <Form.Label >Usuario</Form.Label>
                                <Form.Control type="text" name='name' value={data.name} onChange={e=> setData(e)} required />
                            </Form.Group>

                            <Form.Group id="password">
                                <Form.Label >Contraseña</Form.Label>
                                <Form.Control type="password" name='password' value={data.password} onChange={e=> setData(e)} required />
                            </Form.Group>


                            <Button className='w-100 ' type="submit">Registrarse</Button>
                        </form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                ¿No tienes una cuenta? <Link to="/signup">Registrate</Link> 
            </div>
        </div>
    </Container>
  )
}
