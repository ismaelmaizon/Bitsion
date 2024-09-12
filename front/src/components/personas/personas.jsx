import { DataGrid } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';
import { useContext, useEffect, useState } from 'react';
import { MiContexto } from '../context/context';
import { Autocomplete, Button, FormControl, Grid, TextField } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchIcon from '@mui/icons-material/Search';


export default function Personas() {

    const {
        personas,
        getPersona, setPersona,
        getAtributos,getPersonAtr,
        rows, setRows,
        refresh,
    } = useContext(MiContexto)

    //persona    
    const [per, setPer] = useState('')
    const handleChangeProd = (event) => {
        console.log(event.target.innerText)
        setPer(event.target.innerText)
    }
    const [dnis, setDnis] = useState([])

    const columns = [
        { field: 'col0', headerName: 'fullName', width: 150 },
        { field: 'col1', headerName: 'DNI', width: 100 },
        { field: 'col2', headerName: 'edad', width: 100 },
        { field: 'col3', headerName: 'genero', width: 100 },
        { field: 'col4', headerName: 'estado', width: 150 },
        { field: 'col5', headerName: 'Ingreso', width: 250 }
    ]

    

    useEffect(()=>{  
        console.log(personas);
        let pers = []
        let dni = []
        personas.map((person)=>{
            console.log(person);
            if (person.estado == 0) {
                let newProd = {
                    id: person.id,
                    col0: person.nombre_completo, 
                    col1: person.identificacion, 
                    col2: person.edad, 
                    col3: person.genero, 
                    col4: 'NO', 
                    col5: person.fecha_registro, 
                    
                }    
                pers.push(newProd)
            }else{
                let newProd = {
                    id: person.id,
                    col0: person.nombre_completo, 
                    col1: person.identificacion, 
                    col2: person.edad, 
                    col3: person.genero, 
                    col4: 'Activo', 
                    col5: person.fecha_registro, 
                    
                }  
                pers.push(newProd)
            }
            dni.push(person.identificacion)
            }
        )
        setRows(pers)
        setDnis(dni)
        
    }, [])

    return (
        <div style={{ height: 350, width: '90%', margin: 'auto', marginTop: '15px' }}>
            <Grid container direction='row' gap={2} >
                <Button variant="contained"  sx={{width: '100px', height: '25px', padding: '20px' }} endIcon={<RotateLeftIcon />} onClick={()=>{refresh()}}>refresh</Button>
            </Grid>
            <Grid sx={{ display: { xs: 'none', md: 'grid', gridTemplateColumns: `repeat(6, 1fr)`, alignItems:'center'},  gap: '5px' }} container>
                <Grid item xs={6}>
                    <FormControl sx={{ marginTop: '25px' , width: '100%',paddingBottom: '25px'}}>
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={dnis}
                    style={{width: '250px', height: '45px'}}
                    onChange={handleChangeProd}
                    renderInput={(params) => <TextField {...params} label="DNI´s" />}
                    />  
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained"  sx={{padding: '10px' }} endIcon={<SearchIcon />} onClick={ async ()=>{ 
                        await getAtributos()
                        await getPersonAtr(per)
                        let res = await getPersona(per)
                        if (res) {
                            console.log(res);
                            setPersona(res)     
                        }
                        }} >ver</Button>
                </Grid>
            </Grid>
            <DataGrid sx={{height: '500px'}} rows={rows} columns={columns}  />
        </div>
    );
}