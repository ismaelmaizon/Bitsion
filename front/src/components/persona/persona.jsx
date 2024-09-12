
import { useContext, useEffect, useState } from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import { Link,  } from "react-router-dom"

export default function Persona() {
    const {
        persona, atributosPerson, atributos
    } = useContext(MiContexto)

    const [atrib, setAtrib] = useState([])

    useEffect(()=>{
        console.log(persona);
        console.log(atributos);
        console.log(atributosPerson);
        let array = []
        atributos.map((at)=>{
            console.log(at);
            atributosPerson.map((pe)=>{
                console.log(pe);
                if (at.id == pe.id_atributo) {
                    array.push(at)
                }
            })
        })
        setAtrib(array)
        if (persona.estado == 0) {
            persona.estado = 'NO'
        }else{
            persona.estado = 'Activo'
        }
        
    }, [persona])

    return (
        <div>
            {
            persona.length == 0 ? <div></div> : <Card sx={{margin: 'auto', marginTop: '25px', maxWidth: '700px'  }}>
                    <Grid container direction='row' alignItems='center' style={{ maxWidth: '600px', margin: 'auto' }} >
                            <Grid item xs={4} container>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Informacion del Persona 
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Nombre: {persona.nombre_completo} 
                                    </Typography>
                                    <Typography  variant="body2" color="text.secondary">
                                    DNI: {persona.identificacion}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Edad: {persona.edad} 
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Genero: {persona.genero}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Estado: {persona.estado}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography gutterBottom variant="h6" >
                                        Atributos Actuales
                                        </Typography>
                                        <div>
                                            { atrib.map((a, index)=>{
                                                return  <Typography key={index} variant="body2" > {a.atributo} </Typography>
                                            }) }
                                        </div>
                            </Grid>
                            <Grid item xs={4} container direction='column' spacing={1} alignContent='center' >
                                <Grid item xs={6} >
                                    <Link to='/addAtributoAPersona' >
                                        <Button size="small" color="info" variant="contained" onClick={ async ()=>{
                                        }} >agaregara atributo</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={6}>
                                    <Link to='/updatePersona' >
                                        <Button size="small" color="info" variant="contained" onClick={ async ()=>{
                                        }} >actualizar info</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={6}>
                                        <Button size="small" color="info" variant="contained" onClick={async ()=>{ 
                                            
                                        }} >eliminar</Button>
                                </Grid>
                            </Grid>
                    </Grid>
                </Card>
            } 
    </div>)
    
    }