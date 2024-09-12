import { Router } from "express";
import { createAtributo, deleteAtributo, getAtributos } from "../controllers/atributos.controller.js";

const router = Router();

//add atributo
router.post("/addAtributo", createAtributo);
// GET atributos
router.get("/getAtributos", getAtributos);
// Elimnar Lugar
router.delete("/deleteAtributo/:id", deleteAtributo);

export default router;
