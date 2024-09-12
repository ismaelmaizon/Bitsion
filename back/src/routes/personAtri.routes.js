import { Router } from "express";
import { addpersonaAtri, deletePersonaAtri, getPersonAtr } from "../controllers/personAtri.controller.js";




const router = Router()


//add atributo a persona
router.post("/addpersonaAtri/:dni", addpersonaAtri);
//getPersonAtri
router.get("/getPersonAtributos/:dni", getPersonAtr);
//deletePersonaAtri
router.delete("/deletePersonaAtri/:dni", deletePersonaAtri);




export default router