import { Form, Button, Row, Col } from "react-bootstrap";

export default function FiltroPanel({ filters, onChange, onReset }) {
  return (
    <Form>

      <Form.Group className="mb-3" controlId="filtroHecho">
        <Form.Label><b>Hecho</b></Form.Label>
        <Form.Select
          value={filters.tipo}
          onChange={(e) => onChange({ ...filters, tipo: e.target.value })}
        >
          <option value="todos">Todos</option>
          <option value="choque">Choque</option>
          <option value="detencion">Detención</option>
          <option value="incendio">Incendio</option>
          <option value="incidente">Incidente</option>
          <option value="secuestro">Secuestro</option>
          <option value="vuelco">Vuelco</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="filtroMedio">
        <Form.Label><b>Medio</b></Form.Label>
        <Form.Select
          value={filters.medio}
          onChange={(e) => onChange({ ...filters, medio: e.target.value })}
        >
          <option value="todos">Todos</option>
          <option value="automovil">Automóvil</option>
          <option value="bicicleta">Bicicleta</option>
          <option value="camion">Camión</option>
          <option value="cuatriciclo">Cuatriciclo</option>
          <option value="motocicleta">Motocicleta</option>
          <option value="omnibus">Ómnibus</option>
          <option value="remolque">Remolque</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="filtroHoras">
        <Form.Label><b>Horas</b></Form.Label>
        <Form.Select
          value={filters.periodo}
          onChange={(e) => onChange({ ...filters, periodo: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="maniana">07:00 - 14:00</option>
          <option value="tarde">14:01 - 21:00</option>
          <option value="noche">21:01 - 06:59</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="filtroFallecidos">
        <Form.Label><b>Fallecidos</b></Form.Label>
        <Form.Select
          value={filters.fallecidos}
          onChange={(e) => onChange({ ...filters, fallecidos: e.target.value })}
        >
          <option value="todos">Sin filtro</option>
          <option value="con">Solo fallecidos</option>
          <option value="sin">Sin fallecidos</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="filtroBusqueda">
        <Form.Label><b>Búsqueda</b></Form.Label>
        <Form.Control
          type="text"
          value={filters.keyword}
          onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
          placeholder="Ingrese palabra clave"
        />
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="filtroDesde">
            <Form.Label>Desde</Form.Label>
            <Form.Control
              type="date"
              value={filters.desde}
              onChange={(e) => onChange({ ...filters, desde: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="filtroHasta">
            <Form.Label>Hasta</Form.Label>
            <Form.Control
              type="date"
              value={filters.hasta}
              onChange={(e) => onChange({ ...filters, hasta: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="outline-danger" onClick={onReset} className="w-100">
        Resetear Filtros
      </Button>
    </Form>
  );
}
