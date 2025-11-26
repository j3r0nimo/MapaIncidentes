import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchIncidentes } from "../api/incidentesApi";   // Función que solicita los datos al backend
import { Table, Container, Button, Pagination } from "react-bootstrap";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [keyword, setKeyword] = useState('');
  const LIMIT = 5;

  // función que obtiene los datos
  useEffect(() => {
    let mounted = true;
    const getIncidentes = async () => {
      setLoading(true);
      try {
        const respuesta = await FetchIncidentes(page, LIMIT, keyword);
        console.log("Fetched data:", respuesta);
        if (mounted) {
          setIncidentes(respuesta.data || []);  // esperamos un arreglo
          const total = respuesta.total || 0;
          const totalPaginas = Math.ceil(total / LIMIT);
          setTotalPages(totalPaginas > 0 ? totalPaginas : 1);
        }

      } catch (err) {
        console.error("Error al cargar los incidentes:", err);
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getIncidentes();
    return () => { mounted = false };
  }, [page, keyword]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(searchTerm);
    setPage(1);
  }

  const handleClear = (event) => {
    event.preventDefault();
    setKeyword("");
    setSearchTerm("")
    setPage(1);
  }

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

      <div className="mb-3">
        <form onSubmit={handleSearch} className="d-flex gap-2 align-items-center">
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: "300px" }}
            placeholder="Buscar por título, patente, dirección..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button type="submit" variant="primary">
            Buscar
          </Button>

          <Button onClick={handleClear} variant="primary">
            borrar filtro
          </Button>

        </form>

        {keyword && (
          <p className="text-muted mt-2">
            Resultados para: <strong>"{keyword}"</strong>
          </p>
        )}
      </div>

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
      {incidentes.length > 0 && (
        <div className="d-flex justify-content-center mt-3 align-items-center gap-2">
          <Pagination className="mb-0">
            <Pagination.Prev onClick={handlePrev} disabled={page === 1} />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next onClick={handleNext} disabled={page >= totalPages} />
          </Pagination>
          <span className="text-muted">de {totalPages} páginas</span>
        </div>
      )}
    </Container>
  );

}