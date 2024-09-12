
import { useContext, useEffect} from "react"
import { MiContexto } from "../context/context"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//lugares
import {Button} from '@mui/material';
//personas
import Personas from "../personas/personas";
import Persona from "../persona/persona";

//icons
import NavBar from "../navbar/navBar";

export default function Inicio() {
    const {
        vperson, setVperson,
        getPersonas, getAtributos,
    } = useContext(MiContexto)

    const router = useNavigate()

    useEffect(()=>{        
        console.log(vperson);        
    }, [])



    return (
        <div>
            <NavBar/>
            {
               vperson ? <div>
                <div>
                    <Persona/>
                </div> 
                <div style={{ width: '100%', marginTop: '50px' }}><Personas/></div> 
               </div> 
               : <div style={{ display: 'flex', marginTop: '45px' }} >
                   <Button variant="contained" size="large" style={{ margin: 'auto', backgroundColor: '#ab47bc' }} onClick={ async ()=>{ 
                       let res = await getPersonas()
                       console.log(res.response);
                       if(res.status == 200){
                        await getAtributos()
                        //await getTipos()
                        setVperson(true)       
                        }else{
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "su session expiro",
                                showConfirmButton: false,
                                timer: 1500
                              });
                            router('/')
                        }}
                       }
                        >Personas</Button>
               </div>
            }
            </div>
    ) 
}
