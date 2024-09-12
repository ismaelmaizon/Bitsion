import { Router } from "express";
import {
  actualizarPersona,
  createPersona,
  deletePersona,
  getPersona,
  getPersonas,
} from "../controllers/personas.controller.js";
import __dirname  from '../utils.js'

const router = Router();

//add persona
router.post("/addpersona", createPersona);
//get personas
router.get("/getPersonas", getPersonas);
// GET un producto
router.get("/getPersona/:dni", getPersona);
// UPDATE un producto
router.put("/updatePersona", actualizarPersona)
// INSERT un producto
router.delete("/deletePersona/:dni", deletePersona);


export default router;
