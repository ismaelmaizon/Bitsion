import { pool } from "../db.js";


export const createAtributo = async (req, res) => {
  const {atributo} = req.body
  console.log(atributo);
  
  try {
    const [rows] = await pool.query("INSERT INTO Atributos (atributo) VALUES (?)", [atributo]);
    res.status(200).json({message: 'atrubuto creado'})
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getAtributos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Atributos");
    if(rows.length != 0){
      res.status(200).json({message: 'atributos', atributos: rows })
    }else{
      res.status(201).json({message: 'no existen atributos', atributos: [] })
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const deleteAtributo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const [rows] = await pool.query("SELECT * FROM Atributos WHERE id = ?", [
      id,
    ]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "atributo not found" });
    }else{
      try{
        const [rows] = await pool.query("DELETE FROM Atributos WHERE id = ?", [
          id,
        ]);
        res.status(200).json({ message: 'atributo eliminado' });
      }catch(err){
        return res.status(500).json({ message: "Something goes wrong" });
      }
    }

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
