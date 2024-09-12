import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/navBar";




export default function AddPersona () {

    const {createPersona, alert} = useContext(MiContexto)

    const router = useNavigate()
    const [data, setData] = useState({
        nombre_completo: '',
        identificacion: '',
        edad: '',
        genero: '',
        estado: 0,
    });

    const estado = [
        {
          name: 'Activo'
        },
        {
          name: 'No'
        }
    ];

    const genero = [
        {
          name: 'Masculino'
        },
        {
          name: 'Femenino'
        },
        {
            name: 'Otros'
        }
    ];


    const dataFrom = async (event) => {
        event.preventDefault()      
        setData( {...data, [event.target.name]: event.target.value  } )
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }


    return(
        <div>
        <NavBar/>
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px', boxShadow: '2px 2px 10px 2px' }}  >
            <Typography variant="h4" gutterBottom sx={{ width:'300px', margin: 'auto' }} >
                Nuevo persona
            </Typography>
            <Box component='form' onSubmit={handleSubmit} encType="multipart/form-data" display={'flex'} flexDirection={'column'} >            
            <Grid container direction='row' marginBottom="70px" marginTop="10px">
                <Grid item xs={10} container direction='row' spacing={3} sx={{ margin:'auto' }} >                        
                        <Grid item xs={6}>
                        <TextField fullWidth label='nombre_completo' name='nombre_completo' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField fullWidth label='identificacion' name='identificacion' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label='edad' name='edad' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                </Grid>
                <Grid item xs={10} container direction="row" spacing={3} sx={{ margin:'auto' }}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                sx={{height: '0px'}}
                                id="outlined-select-currency"
                                select
                                label="genero"
                                name="genero"
                                helperText="Please select your lado"
                                onChange={dataFrom}
                                >
                                {genero.map((option, index) => (
                                    <MenuItem key={index} value={option.name}>
                                    {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                sx={{height: '0px'}}
                                id="outlined-select-currency"
                                select
                                label="estado"
                                name="estado"
                                helperText="Please select your lado"
                                onChange={dataFrom}
                                >
                                {estado.map((option, index) => (
                                    <MenuItem key={index} value={option.name}>
                                    {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" size="small" sx={{ width:'200px', margin: 'auto' }} onClick={ async ()=>{
                console.log(data);
                let respon = await createPersona(data)
                console.log(respon.status);
                if (respon.status == 200) {
                    await alert('success')
                    router('/inicio')
                } else if (respon.status == 201){
                    await alert('errorCreate')
                } else {
                    await alert('error')
                }

            }}>crear</Button>
            </Box>
        </Box>
        </div>
    )
}
