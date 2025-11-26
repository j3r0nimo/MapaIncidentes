import * as incidenteService from "../services/incidenteService.js";

export const getIncidentes = (req, res) => {
  res.json(incidenteService.getAll());
};

export const getIncidenteById = (req, res) => {
  const item = incidenteService.getById(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
};

export const createIncidente = (req, res) => {
  const newItem = incidenteService.create(req.body);
  res.status(201).json(newItem);
};

export const updateIncidente = (req, res) => {
  const updated = incidenteService.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
};

export const deleteIncidente = (req, res) => {
  const deleted = incidenteService.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json(deleted);
};
