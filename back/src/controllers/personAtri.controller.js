import { pool } from "../db.js";

//add atributo a persona
export const addpersonaAtri = async (req, res) =>{
    const { dni } = req.params;
    const {id_atributo, descripcion} = req.body
    try{
        const [rows] = await pool.query("SELECT * FROM Persona WHERE identificacion = ?", [
            dni,
        ]);
        if (rows.length <= 0) {
            return res.status(404).json({ message: "persona not found" });
        }else{
            try{
                const [response] = await pool.query("INSERT INTO Persona_Atributo (id_persona, id_atributo, descripcion_adicional) VALUES (?, ?, ?)", [
                    rows[0].id, id_atributo, descripcion
                ]);
                res.status(200).json({ message: 'atributo y persona asociados' });
            }catch(err){
                return res.status(500).json({ message: "Something goes wrong" });
            }
        }
    }catch(err){
        return res.status(500).json({ message: "Something goes wrong" });
    }
} 

//get atributos de una persona
export const getPersonAtr = async (req, res) =>{
    const { dni } = req.params;
    console.log(dni);
    
    try{
        const [rows] = await pool.query("SELECT * FROM Persona WHERE identificacion = ?", [
            dni,
        ]);
        if (rows.length <= 0) {
            return res.status(404).json({ message: "persona not found" });
        }else{
            try{
                const [response] = await pool.query("SELECT * FROM Persona_Atributo WHERE id_persona = ?" , [
                    rows[0].id
                ]);
                res.status(200).json({ message: 'atributos de la persona', atributos: response })
                
            }catch(err){
                return res.status(500).json({ message: "Something goes wrong1" });
            }
        }
    }catch(err){
        return res.status(500).json({ message: "Something goes wrong2" });
    }
} 


//add atributo a persona
export const deletePersonaAtri = async (req, res) =>{
    const { dni } = req.params;
    const {id_atributo} = req.body
    try{
        const [rows] = await pool.query("SELECT * FROM Persona WHERE identificacion = ?", [
            dni,
        ]);
        if (rows.length <= 0) {
            return res.status(404).json({ message: "persona not found" });
        }else{
            try{
                const [response] = await pool.query("DELETE FROM Persona_Atributo WHERE id_persona = ? AND id_atributo = ?", [
                    rows[0].id, id_atributo
                ]);
                res.status(200).json({ message: 'atributo eliminado de la persona' });
            }catch(err){
                return res.status(500).json({ message: "Something goes wrong" });
            }
        }
    }catch(err){
        return res.status(500).json({ message: "Something goes wrong" });
    }
} 

