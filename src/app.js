import express from "express";
import incidenteRoutes from "./routes/incidenteRoutes.js";

const app = express();
app.use(express.json());

// prefix all your incidente API URLs with /api/incidentes
app.use("/api/incidentes", incidenteRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
