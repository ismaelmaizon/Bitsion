import { pool } from "../db.js";
import {DataTime, generarIDAleatorio} from "../utils.js";

//ver todos los personas
export const getPersonas = async (req, res) => {
  try {
    const [productos] = await pool.query("SELECT * FROM Persona");
    res.send( {status: 200, message: 'succes', response: productos} );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
//ver un persona
export const getPersona = async (req, res) => {
  try {
    const { dni } = req.params;
    console.log(dni);
    const [rows] = await pool.query("SELECT * FROM Persona WHERE identificacion = ?", [
      dni,
    ]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "persona not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
//crear persona
export const createPersona = async (req, res) => {
  console.log('persona create'); 
  const {nombre_completo, identificacion, edad, genero, estado } = req.body
  console.log(nombre_completo);
  
  try {
    const [rows] = await pool.query("SELECT * FROM Persona WHERE identificacion = ?", [
      identificacion,
    ]);

    if (rows.length <= 0) {
      try{
        const [rows] = await pool.query(
          "INSERT INTO Persona (nombre_completo, identificacion, edad, genero, estado) VALUES (?, ?, ?, ?, ?);",
          [nombre_completo, identificacion, edad, genero, estado]
        );
        
        console.log(rows);
        res.status(200).json({ message: 'persona cargada' });
      }catch(err){
        return res.status(500).json({ message: "Something goes wrong" });
      }
    }else{
      res.status(201).json({ message: 'ya existe esta persona'  });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
//actualizar persona
export const actualizarPersona = async (req, res) => {
  console.log('persona update'); 
  const {nombre_completo, identificacion, edad, genero, estado } = req.body
  console.log(nombre_completo);
  
  try {
    const [rows] = await pool.query("SELECT * FROM Persona WHERE identificacion = ?", [
      identificacion,
    ]);
    console.log(rows[0]);
    
    if (rows.length != 0) {
      const query = `
      UPDATE Persona 
      SET nombre_completo = ?, edad = ?, genero = ?, estado = ? 
      WHERE identificacion = ?`;
      try{
        const [rows] = await pool.query(query, [nombre_completo, edad, genero, estado, identificacion]);
        console.log(rows);
        res.status(200).json({ message: 'persona actualizada' });
      }catch(err){
        return res.status(500).json({ message: "Something goes wrong" });
      }
    }else{
      res.status(201).json({ message: 'la persona no existe'  });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
//eliminar persona
export const deletePersona = async (req, res) => {
  //delete FROM lugaresProducto where id_producto = 1;
  try {
    const { dni } = req.params;
    console.log(dni);
    const [rows] = await pool.query("SELECT * FROM Persona WHERE identificacion = ?", [
      dni,
    ]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "persona not found" });
    }else{
      try{
        const [rows] = await pool.query("DELETE FROM Persona WHERE identificacion = ?", [
          dni,
        ]);
        res.status(200).json({ message: 'persona eliminada' });
      }catch(err){
        return res.status(500).json({ message: "Something goes wrong" });
      }
    }

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
