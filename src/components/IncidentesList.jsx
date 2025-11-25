import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchIncidentes } from "../api/incidentesApi";   // Función que solicita los datos al backend
import { Table, Container, Button } from "react-bootstrap";

// Función para renderizar el contenido de la tabla
function IncidenteRow({ inc }) {
  return (
    <tr key={inc.id}>
      <td>
        {inc.fecha
          ? new Date(inc.fecha).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          })
          : "N/A"}
      </td>
      <td>{inc.hora || "N/A"}</td>
      <td>{inc.incidente || "N/A"}</td>
      <td>{inc.medio || "N/A"}</td>
      <td>{inc.vehiculo || "N/A"}</td>
      <td>{inc.patente || "N/A"}</td>
      <td>{inc.danios || "null"}</td>
      <td>{inc.lugar || "N/A"}</td>
      <td>{inc.direccion || "N/A"}</td>
      <td>
        {inc.posicion?.lat && inc.posicion?.lng ? (
          <a
            href={`https://www.google.com/maps?q=${inc.posicion.lat},${inc.posicion.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            mapa
          </a>
        ) : (
          "N/A"
        )}
      </td>
      <td>{inc.descripcion || "N/A"}</td>
      <td>
        {/* Enlace al detalle del incidente */}
        <Button as={Link} to={`/incidentes/${inc.id}`} variant="info" size="sm">
          Ver
        </Button>
      </td>
      <td>
        {inc.imagenUrl ? (
          <a href={inc.imagenUrl} target="_blank" rel="noopener noreferrer">
            foto
          </a>
        ) : (
          "N/A"
        )}
      </td>
      <td>
        {inc.web ? (
          <a href={inc.web} target="_blank" rel="noopener noreferrer">
            noticia
          </a>
        ) : (
          "N/A"
        )}
      </td>
    </tr>
  );
}

// Función que exporta la lista de incidentes
export default function IncidentesLista() {
  const [incidentes, setIncidentes] = useState([]);  // variable para almacenar los datos. Es un arreglo de objetos
  const [loading, setLoading] = useState(true);      // variable para ver si los datos se están cargando
  const [error, setError] = useState(null);          // variable para seguimiento de los errores

  // función que obtiene los datos
  useEffect(() => {
    let mounted = true;
    const getIncidentes = async () => {
      try {
        const data = await FetchIncidentes();
        console.log("Fetched data:", data);
        if (mounted) setIncidentes(Array.isArray(data) ? data : []);  // esperamos un arreglo                          
      } catch (err) {
        console.error("Error al cargar los incidentes:", err);
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    getIncidentes();
    return () => { mounted = false };
  }, []);

  // renderizado previo al renderizado de datos
  if (loading) return <Container className="mt-4"><p>Cargando los incidentes...</p></Container>;
  if (error) return <Container className="mt-4"><p style={{ color: "red" }}>Error: {error}</p></Container>;
  if (!incidentes || incidentes.length === 0) return <Container className="mt-4"><p>No se encontraron incidentes.</p></Container>;

  // renderizado de datos
  return (
    <Container fluid className="mt-4">
      <h2>Lista de Incidentes</h2>
      <b>null</b>: dato desconocido. - <b>false</b>: no corresponde.<br />
      <br />
      <b>Daños Serios</b>: Importantes, pero circula.
      <br />
      <b>Daños Graves</b>: No puede circular.<br />
      <br />

      {/* Tabla de React-Bootstrap */}
      <Table striped bordered hover responsive="sm" size="sm">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Incidente</th>
            <th>Medio</th>
            <th>Vehículo</th>
            <th>Patente</th>
            <th>Daños</th>
            <th>Lugar</th>
            <th>Dirección</th>
            <th>Mapa</th>
            <th>Descripción</th>
            <th>Ver</th>
            <th>Foto</th>
            <th>Diario</th>
          </tr>
        </thead>

        <tbody>
          {incidentes.map((inc) => (
            <IncidenteRow key={inc.id} inc={inc} />
          ))}
        </tbody>
      </Table>
    </Container>
  );

}