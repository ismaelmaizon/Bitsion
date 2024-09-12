//import clases from './App.modules.css'
import { Route, Routes } from 'react-router-dom'
//context
import CartProvider from './components/context/context.jsx'
//component
import SignInSide from './components/login/SignInSide.jsx'
import Inicio from './components/inicio/inicio.jsx'
import clases from './App.module.css'
import AddAtributoAPersona from './components/addAtributoAPersona/addAtributoAPersona.jsx'
import AddPersona from './components/addpersona/addpersona.jsx'
import Addatributo from './components/addatributo/addatributo.jsx'
import UpdatePersona from './components/updatePersona/updatePersona.jsx'


function App() {

  return (
    <>
      <div className={clases.class} >
        <CartProvider>
          <div>
              <Routes>
                <Route element={<SignInSide/>} path='/' ></Route>
                <Route element={<Inicio/>} path='/inicio' ></Route>
                <Route element={<AddPersona/>} path='/addpersona' ></Route>
                <Route element={<Addatributo/>} path='/addatributo' ></Route>
                <Route element={<AddAtributoAPersona/>} path='/addAtributoAPersona' ></Route>
                <Route element={<UpdatePersona/>} path='/updatePersona' ></Route>
              </Routes>
            </div>
        </CartProvider>
      </div>
    </>
  )
}

export default App