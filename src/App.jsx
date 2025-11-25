import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import IncidentesLista from "./components/IncidentesList";
import IncidenteDetalle from "./components/IncidenteDetail";
import MapaJitterIncidentes from "./pages/MapaJitter";
import MapaClusterIncidentes from "./pages/MapaCluster";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">Skynet Frontend</Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/incidentes">Incidentes</Nav.Link>
              <Nav.Link as={Link} to="/incidentes/mapa-jitter">Mapa Jitter</Nav.Link>
              <Nav.Link as={Link} to="/incidentes/mapa-cluster">Mapa Cluster</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <Routes>
          <Route path="/" element={<h2>Welcome to Skynet Frontend</h2>} />
          <Route path="/incidentes" element={<IncidentesLista />} />
          <Route path="/incidentes/:id" element={<IncidenteDetalle />} />
          <Route path="/incidentes/mapa-jitter" element={<MapaJitterIncidentes />} />
          <Route path="/incidentes/mapa-cluster" element={<MapaClusterIncidentes />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;