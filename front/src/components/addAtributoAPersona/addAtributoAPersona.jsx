import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/navBar";




export default function AddAtributoAPersona () {

    const {
        persona, atributos, 
        atributosPerson, addPersonAtri,
        alert
    } = useContext(MiContexto)


    const router = useNavigate()

    const [data, setData] = useState({
        id_person:persona.identificacion, 
        id_atributo:'', 
        descripcion:''
    });


    
    const dataFrom = async (event) => {
        event.preventDefault()
        setData( {...data, [event.target.name]: event.target.value  } )
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }
    
    const [atr, setAtr] = useState([])
    const filtro = () =>{
        let at = []
        atributosPerson.map((u)=>{
            at = atributos.filter( item => item.id == u.id_atributo)
        })
        console.log(at);
        setAtr(at)
    }

    
    useEffect(()=>{
        filtro()
    },[])


    return(
        <div>
        <NavBar/>
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px', boxShadow: '2px 2px 10px 2px' }} >
            <Typography variant="h4" gutterBottom sx={{ width:'300px', margin: 'auto' }} paddingBottom={3} >
                agregar atributo:
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
                <Typography variant="h6" gutterBottom sx={{ width:'300px'}}>{persona.nombre_completo}  </Typography>
                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        sx={{height: '10px' , marginBottom: '100px' }}
                        id="outlined-select-currency"
                        select
                        label="atributos"
                        name="id_atributo"
                        helperText="Porfavor seleccione ubicacion"
                        onChange={dataFrom}
                        >
                        {atr.map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                            {option.atributo}
                            </MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                <Grid container direction="column" rowSpacing={1} spacing={5} marginBottom="5px" marginTop="5px" >
                    <Grid item xs={6}>
                    <TextField 
                        required
                        fullWidth 
                        label='Ingrese una descripcion' 
                        name='descripcion' 
                        type="text" 
                        onChange={dataFrom}/>
                    </Grid>
                    
                </Grid>
                <Grid container direction='row' sx={{ width:'500px', margin: 'auto' }} spacing={5} >
                    <Grid item xs={6}  >
                        <Button type="submit" variant="contained" size="small" sx={{ width:'200px'}} onClick={ async ()=>{
                            console.log(data);
                            let res = await addPersonAtri(data)
                            res ? (alert('success'), router('/inicio') ) : alert('error')
                        }} >agregar</Button>
                    </Grid>
                    <Grid item xs={6}  >
                        <Button type="submit" variant="contained" size="small" sx={{ width:'200px'}} onClick={()=>{
                            //refresh()
                            router('/inicio')
                        }}>volver</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </div>
    )
}
