import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Fragment,useState } from 'react';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Link } from 'react-router-dom';



export default function NavBar() {

    //despliegue getProductosLugar
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };    
    const links = [
      {text: 'Agregar Persona', url: '/addpersona', icon: BorderColorIcon },
      {text: 'Agregar Atributo', url: '/addatributo', icon: AddLocationIcon },
    ]
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {links.map((link, index) => {
            const Icon = link.icon
            return(
            <ListItem key={index} disablePadding>
              <Link to = {link.url} >
                <ListItemButton >
                  <ListItemIcon>
                     <Icon/>
                  </ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </Link>  
            </ListItem>)
          })}
        </List>
      </Box>
    );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div>
              <Fragment>
                <Button sx={{color:'white'}} onClick={toggleDrawer('left', true)}><DensityMediumIcon/></Button>
                <Drawer
                  anchor={'left'}
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                >
                  {list('left')}
                </Drawer>
              </Fragment>
          </div>
          <Link to='/inicio' >
            <Typography
              variant="h6"
              noWrap
              component="div"
              color={'white'}
            >
                  Ficticia S.A
            </Typography>
          </Link>
          
          <Box sx={{ flexGrow: 1 }} /> 
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}