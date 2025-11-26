import express from "express";
import * as incidenteController from "../controllers/incidenteController.js";

const router = express.Router();

router.get("/", incidenteController.getIncidentes);
router.get("/:id", incidenteController.getIncidenteById);
router.post("/", incidenteController.createIncidente);
router.put("/:id", incidenteController.updateIncidente);
router.delete("/:id", incidenteController.deleteIncidente);

export default router;