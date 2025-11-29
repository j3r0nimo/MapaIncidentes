import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function Administracion() {
    const BASE_URL = "http://localhost:3001/incidentes";
    const [listaIncidentes, setListaIncidentes] = useState([]);
    const [idEdicion, setIdEdicion] = useState(null);
    const datosIniciales = {
        incidente: "null",
        descripcion: "null",
        lat: "null",
        lng: "null",
        fecha: "null",
        hora: "null",
        medio: "null",
        vehiculo: "null",
        patente: "null",
        direccion: "",
        lugar: "null",
        danios: "",
        heridos: 0,
        fallecidos: 0,
        bomberos: "",
        web: "",
        imagenUrl: ""

    };
    const [datos, setDatos] = useState(datosIniciales);
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('isAdmin') !== 'true') {
            navigate('/acceso-interno', { replace: true });
        }
    }, [navigate]);
    useEffect(() => {
        cargarIncidentes();
    }, []);

    const cargarIncidentes = async () => {
        try {
            const res = await fetch(BASE_URL);
            const data = await res.json();
            setListaIncidentes(data);
        } catch (error) {
            console.error("Error cargando lista:", error);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDatos({
            ...datos,
            [e.target.name]: value
        });
    };

    const handleSeleccionarParaEditar = (item) => {
        setIdEdicion(item.id);
        setDatos({
            ...item,
            lat: item.posicion?.lat || "",
            lng: item.posicion?.lng || ""
        });
    };

    const handleCancelarEdicion = () => {
        setIdEdicion(null);
        setDatos(datosIniciales);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const incidenteFinal = {
            ...datos,
            fecha: datos.fecha || new Date().toISOString(),
            posicion: {
                lat: parseFloat(datos.lat),
                lng: parseFloat(datos.lng)
            }
        };

        try {
            let response;
            if (idEdicion) {
                response = await fetch(`${BASE_URL}/${idEdicion}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(incidenteFinal)
                });
            } else {
                response = await fetch(BASE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(incidenteFinal)
                });
            }

            if (response.ok) {
                alert(idEdicion ? "¡Incidente actualizado!" : "¡Incidente creado!");
                handleCancelarEdicion();
                cargarIncidentes();
            } else {
                alert("Error al guardar en el servidor");
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este incidente?")) return;

        await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
        cargarIncidentes();
        if (idEdicion === id) handleCancelarEdicion();
    };
    const handleCerrar = async () => {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('adminName');
        navigate('/acceso-interno', { replace: true });
    }
    return (
        <Container fluid className="mt-4">
            <Row md={6}>
                <div>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={handleCerrar}
                    >
                        Cerrar sesion
                    </Button>
                </div>

            </Row>
            <Row>
                <Col md={5}>
                    <h3>Incidentes Existentes</h3>
                    <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Incidente</th>
                                    <th>Dirección</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaIncidentes.slice().reverse().map((inc) => (
                                    <tr key={inc.id} className={idEdicion === inc.id ? "table-primary" : ""}>
                                        <td>{inc.incidente}</td>
                                        <td>{inc.direccion}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleSeleccionarParaEditar(inc)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleEliminar(inc.id)}
                                            >
                                                X
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
                <Col md={7}>
                    <div className={`card p-4 shadow ${idEdicion ? "border-warning" : "border-primary"}`}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className={idEdicion ? "text-warning" : "text-primary"}>
                                {idEdicion ? "Editar Incidente" : "Nuevo Incidente"}
                            </h2>
                            {idEdicion && (
                                <Button variant="secondary" onClick={handleCancelarEdicion}>
                                    Cancelar Edición
                                </Button>
                            )}
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tipo de Incidente</Form.Label>
                                        <Form.Select name="incidente" value={datos.incidente} onChange={handleChange}>
                                            <option value="choque">Choque</option>
                                            <option value="detencion">Detención</option>
                                            <option value="incendio">Incendio</option>
                                            <option value="incidente">Incidente</option>
                                            <option value="secuestro">Secuestro</option>
                                            <option value="vuelco">Vuelco</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Medio</Form.Label>
                                        <Form.Select name="medio" value={datos.medio} onChange={handleChange}>
                                            <option value="automovil">Automóvil</option>
                                            <option value="motocicleta">Motocicleta</option>
                                            <option value="camion">Camión</option>
                                            <option value="bicicleta">Bicicleta</option>
                                            <option value="omnibus">Ómnibus</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Dirección</Form.Label>
                                        <Form.Control type="text" name="direccion" value={datos.direccion} onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Hora</Form.Label>
                                        <Form.Control type="time" name="hora" value={datos.hora} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Fecha</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="fecha"
                                            value={datos.fecha ? datos.fecha.substring(0, 10) : ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Latitud</Form.Label>
                                        <Form.Control type="number" step="any" name="lat" value={datos.lat} onChange={handleChange} placeholder="-38.7..." />
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Longitud</Form.Label>
                                        <Form.Control type="number" step="any" name="lng" value={datos.lng} onChange={handleChange} placeholder="-62.2..." />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>bomberos</Form.Label>
                                        <Form.Select name="bomberos" value={datos.bomberos} onChange={handleChange}>
                                            <option value="false">No</option>
                                            <option value="true">Si</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={7}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Vehículo</Form.Label>
                                        <Form.Control type="text" name="vehiculo" value={datos.vehiculo} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Patente</Form.Label>
                                        <Form.Control type="text" name="patente" value={datos.patente} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Daños</Form.Label>
                                        <Form.Select name="danios" value={datos.danios} onChange={handleChange}>
                                            <option value="null">nulos</option>
                                            <option value="livianos">Livianos</option>
                                            <option value="serios">Serios</option>
                                            <option value="graves">Graves</option>
                                            <option value="totales">Totales</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Heridos</Form.Label>
                                        <Form.Control type="number" step="any" name="heridos" value={datos.heridos} onChange={handleChange} placeholder="0" />
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Fallecidos</Form.Label>
                                        <Form.Control type="number" step="any" name="fallecidos" value={datos.fallecidos} onChange={handleChange} placeholder="0" />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Lugar</Form.Label>
                                        <Form.Select name="lugar" value={datos.lugar} onChange={handleChange}>
                                            <option value="null">nulo</option>
                                            <option value="calle">Calle</option>
                                            <option value="esquina">Esquina</option>
                                            <option value="ruta">Ruta</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" rows={2} name="descripcion" value={datos.descripcion} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Noticia</Form.Label>
                                        <Form.Control type="text" name="web" value={datos.web} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>url de la imagen</Form.Label>
                                        <Form.Control type="text" name="imagenUrl" value={datos.imagenUrl} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button
                                type="submit"
                                className="w-100"
                                variant={idEdicion ? "warning" : "primary"}
                            >
                                {idEdicion ? "Guardar Cambios" : "Crear Incidente"}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
