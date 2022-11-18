import React, {useState} from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Layaout from './components/Layaout';
import Routines from './pages/Routines'
import Routine from './pages/Routine';
import Record from './pages/Record';
import './App.css';

export const userContext = React.createContext()

function App() {
  const [currentUser, setCurrentUser] = useState("")

  function addUser(user) {
    setCurrentUser(user)
  }
  return (
    <userContext.Provider value={currentUser}>
      <Routes >
        <Route path='/routime' element={<h1>root</h1>} />
        <Route path='/login' element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path='/signup' element={<Signup setCurrentUser={addUser}/> } /> 
        <Route path='/registro' element={<Registro/>} />
        
        <Route element={<Layaout />} >
          <Route path='/rutinas/' >
            <Route index element={<Routines /> } />
            <Route path=':id' element={<Routine />} />
          </Route>
          <Route path='/record' element={<Record />} />
        </Route>      
      </Routes>
    </userContext.Provider>
  );
}

export default App;
