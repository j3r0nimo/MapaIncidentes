import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FetchMapaCluster } from "../api/incidentesApi";
import { MarkerCluster } from "../components/MarkerCluster";

import { Row, Col, Container, Spinner, Offcanvas, Button } from "react-bootstrap";
import FiltroPanel from "../components/FiltroPanel";
import Resumen from "../components/Resumen";
import { estaEnRango } from "../utils/timeUtils";


export default function MapaCluster() {
  const [incidentes, setIncidentes] = useState([]);
  const [filteredIncidentes, setFilteredIncidentes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showFilters, setShowFilters] = useState(false);
  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);

  const [filters, setFilters] = useState({
    tipo: "todos",
    medio: "todos",
    periodo: "",
    fallecidos: "todos",
    keyword: "",
    desde: "",
    hasta: "",
  });

  const resetFilters = () => {
    setFilters({
      tipo: "todos",
      medio: "todos",
      periodo: "",
      fallecidos: "todos",
      keyword: "",
      desde: "",
      hasta: "",
    });
    setFilteredIncidentes(incidentes);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const json = await FetchMapaCluster();
        setIncidentes(json || []);
        setFilteredIncidentes(json || []);
      } catch (err) {
        console.error(err);
        setIncidentes([]);
        setFilteredIncidentes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = incidentes;

    if (filters.tipo && filters.tipo !== "todos") {
      filtered = filtered.filter(
        (inc) => inc.incidente?.toLowerCase() === filters.tipo.toLowerCase()
      );
    }

    if (filters.medio && filters.medio !== "todos") {
      filtered = filtered.filter(
        (inc) => inc.medio?.toLowerCase() === filters.medio.toLowerCase()
      );
    }

    if (filters.periodo) {
      filtered = filtered.filter((inc) => {
        const hora = inc.hora || "00:00";
        if (filters.periodo === "maniana") return estaEnRango(hora, "07:00", "14:00");
        if (filters.periodo === "tarde") return estaEnRango(hora, "14:01", "21:00");
        if (filters.periodo === "noche") return estaEnRango(hora, "21:01", "06:59");
        return true;
      });
    }

    if (filters.fallecidos && filters.fallecidos !== "todos") {
      filtered = filtered.filter((inc) => {
        if (filters.fallecidos === "con") return inc.fallecidos > 0;
        if (filters.fallecidos === "sin") return inc.fallecidos === 0;
        return true;
      });
    }

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      filtered = filtered.filter(
        (inc) =>
          inc.direccion?.toLowerCase().includes(kw) ||
          inc.vehiculo?.toLowerCase().includes(kw) ||
          inc.patente?.toLowerCase().includes(kw) ||
          inc.descripcion?.toLowerCase().includes(kw)
      );
    }

    if (filters.desde) {
      const desdeTime = new Date(filters.desde).getTime();
      filtered = filtered.filter((inc) => {
        if (!inc.fecha) return false;
        const fechaTime = new Date(inc.fecha).getTime();
        return !isNaN(fechaTime) && fechaTime >= desdeTime;
      });
    }

    if (filters.hasta) {
      const hastaTime = new Date(filters.hasta).getTime();
      filtered = filtered.filter((inc) => {
        if (!inc.fecha) return false;
        const fechaTime = new Date(inc.fecha).getTime();
        return !isNaN(fechaTime) && fechaTime <= hastaTime;
      });
    }

    setFilteredIncidentes(filtered);
  }, [filters, incidentes]);


  const total = filteredIncidentes.length;
  const fallecidos = filteredIncidentes.reduce(
    (acc, inc) => acc + (inc.fallecidos || 0),
    0
  );

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Cargando incidentes...</p>
      </Container>
    );
  }

  return (
    <Row className="g-0">

      <Col md={4} lg={3}>
        <Offcanvas
          show={showFilters}
          onHide={handleCloseFilters}
          responsive="md"
          placement="start"
          className="bg-light p-3"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filtros</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <FiltroPanel
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
            />
            <hr />
            
          </Offcanvas.Body>
          <Resumen total={total} fallecidos={fallecidos} />
        </Offcanvas>
      </Col>

      <Col xs={12} md={8} lg={9} style={{ position: "relative" }}>

        <Button
          variant="primary"
          className="d-md-none"
          onClick={handleShowFilters}
          style={{ position: "absolute", top: 10, left: 55, zIndex: 1000 }}
        >
          Mostrar Filtros
        </Button>

        <MapContainer
          center={[-38.85, -62.0]}
          zoom={11}
          style={{ height: "100vh", width: "100%" }}
          maxZoom={20}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerCluster incidentes={filteredIncidentes} />

        </MapContainer>
      </Col>
    </Row>
  );
}