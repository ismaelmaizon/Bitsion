import { Router } from "express";
import { autenticacion, login, reg } from "../controllers/login.controller.js";


const router = Router()
//crear nuevo tipo
router.post('/log', login)
router.post('/reg', reg)

export default router