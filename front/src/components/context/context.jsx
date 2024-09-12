/* eslint-disable no-mixed-spaces-and-tabs */
// contexto

import { useEffect, useState } from "react";
import { createContext } from "react";
//alert
import Swal from 'sweetalert2'

export const MiContexto = createContext([])

const URL = import.meta.env.VITE_BACKEND_URL

const CartProvider = ( { children } ) => {
  //vista
  const [vperson, setVperson] = useState(false)
  const [vent, setVent] = useState(false)
  const [cart, setCart] = useState([])

  //crear persona
  const createPersona = async ( data ) =>{
    let persona = {
      "nombre_completo": data.nombre_completo,
      "identificacion": data.identificacion,
      "edad": data.edad,
      "genero": data.genero,
      "estado": 1
    }
    if (data.estado == 'Activo'){
      persona.estado = 1
    }else{
      persona.estado = 0
    }  
    try {
      const response = await fetch(`http://${URL}/api/personas/addpersona`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(persona)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setVperson(false)
      return response
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      
    }
  }

  //obtener personas
  const [personas, setPersonas] = useState([])
  const getPersonas = async () =>{
      try {
          const response = await fetch(`http://${URL}/api/personas/getPersonas`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setPersonas(data.response);
          console.log(data.response);
          return data
        } catch (error) {
          let response = { status: 500 }
          console.error('problemas con la consulta:', error);
          return response        
        }
      
  }


//obtener persona
const [idPerson, setIdPerson] = useState('')
const [persona, setPersona] = useState([])
const getPersona = async (id) =>{
    try {
      const response = await fetch(`http://${URL}/api/personas/getPersona/${id}`)
      if (!response.ok) {
        throw new Error('problemas al consultar en la navegacion');
      }
        const data = await response.json();
        setIdPerson(data.id)
        return data
      } catch (error) {
        console.error('problemas con la consulta:', error);
      }
    
}
  
//actualizar persona
//crear persona
const updatePersona = async ( data ) =>{
  let persona = {
    "nombre_completo": data.nombre_completo,
    "identificacion": data.identificacion,
    "edad": data.edad,
    "genero": data.genero,
    "estado": 1
  }
  if (data.estado == 'Activo'){
    persona.estado = 1
  }else{
    persona.estado = 0
  }  
  console.log(persona);
  try {
    const response = await fetch(`http://${URL}/api/personas/updatePersona`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(persona)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    setVperson(false)
    return response
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    
  }
}


//crear atributo
const createAtributo = async (data) =>{
  let atributo = {
    atributo: data.atributo
  }
  console.log(atributo);
  try {
    const response = await fetch(`http://${URL}/api/atributos/addAtributo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(atributo)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  } 
}
//obtener atributos
const [atributos, setAtributos] = useState([])
const getAtributos = async () =>{
    try {
        const response = await fetch(`http://${URL}/api/atributos/getAtributos`)
        if (!response.ok) {
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        setAtributos(data.atributos)
        console.log(data);
        
      } catch (error) {
        console.error('problemas con la consulta:', error);
      }
    
}


//obtener atributos de la persona
const [atributosPerson, setAtributosPerson] = useState([])
const getPersonAtr = async (id) =>{
    try {
        const response = await fetch(`http://${URL}/api/personaAtributo/getPersonAtributos/${id}`)
        if (!response.ok) {
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        
        setAtributosPerson(data.atributos)
        console.log(data);
        
      } catch (error) {
        console.error('problemas con la consulta:', error);
      }
    
}

//incertar atributo a persona
const addPersonAtri = async (data) =>{
  let info = {
    id_atributo:data.id_atributo,
	  descripcion:data.descripcion
  }
  console.log(data.identificacion);
  console.log(info);
  
  try {
    const response = await fetch(`http://${URL}/api/personaAtributo/addpersonaAtri/${data.id_person}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  } 
}

  // Filtro productos
  // rows (filas de la tabla) 
  const [rows, setRows] = useState([])
  
  const filtrarTipoLadoLug = async (tipo, lado, lug) => {
    setRows([]);
    let prods = [];
    
    const addProduct = (prod) => {
        tipos.map((ti)=>{
          if (prod.Tipo == ti.id) {
            prods.push({
                id: prod.id,
                col0: prod.IdGenerate,
                col1: ti.Tipo,
                col2: ti.Descripcion,
                col3: prod.Alto,
                col4: prod.Ancho,
                col5: prod.Derc,
                col6: prod.Izq,
                col7: prod.stock,
                col8: prod.Precio_U
            });  
        } 
      })
    };

    const filterByLugar = async (lug) => {
        const response = await getProductosLugar(lug);
        response.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id) addProduct(prod);
            });
        });
    };

    const filterByTipo = () => {
        productos.forEach(prod => {
            if (tipo === prod.Tipo) addProduct(prod);
        });
    };

    const filterByLado = () => {
        productos.forEach(prod => {
            if ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1)) addProduct(prod);
        });
    };

    const filterByTipoYLado = () => {
        productos.forEach(prod => {
            if ((lado === 'Derc' && prod.Derc === 1 && tipo === prod.Tipo) || (lado === 'Izq' && prod.Izq === 1 && tipo === prod.Tipo)) addProduct(prod);
        });
    };

    const filterByLugarYTipo = async (lug) => {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && tipo === prod.Tipo) addProduct(prod);
            });
        });
    };

    const filterByLugarYLado = async (lug) => {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1))) addProduct(prod);
            });
        });
    };


    if (lug && !tipo && !lado) {
        await filterByLugar(lug);
    } else if (tipo && !lado && !lug) {
        filterByTipo();
    } else if (lado && !tipo && !lug) {
        filterByLado();
    } else if (lug && tipo && !lado) {
        await filterByLugarYTipo(lug);
    } else if (lug && lado && !tipo) {
        await filterByLugarYLado(lug);
    } else if (tipo && lado && !lug) {
        filterByTipoYLado();
    } else if (tipo && lado && lug) {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1)) && tipo == prod.Tipo ) addProduct(prod);
            });
        });
    }

    return prods
  };
  

  const refresh = () =>{
    setPersona([])
  }

//Alertas
const alert = async (status) =>{
  if (status == 'success') {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Proceso exitoso"
      });
  }else if (status == 'error') {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "Problemas con el proceso"
    });
  }else if (status == 'errorCreate') {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "La persona ya existe"
    });
  }

}
      

  useEffect(()=>{
    console.log('context');
  },[])

  return (
      // aca llamamos al hoock useMiContexto
      <MiContexto.Provider value={{
      
        vperson, setVperson, vent, setVent,
        cart, setCart,
        
        createPersona, 
        personas, setPersonas, getPersonas,
        persona, setPersona, getPersona, idPerson, setIdPerson,
        

        filtrarTipoLadoLug, rows, setRows,
        
        createAtributo,updatePersona,
        getAtributos, atributos, setAtributos,
        atributosPerson, setAtributosPerson,


        getPersonAtr, addPersonAtri,

        refresh,

        alert
      }} >
          {children}
      </MiContexto.Provider>
  )
}

// Este va a ser el encargado de proveer el contexto a elementos hijos
export default CartProvider