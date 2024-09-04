import { Button, Form, Modal } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from 'react';
import Lugar from "../models/Lugar";
import { useNavigate } from 'react-router-dom';
import ActualizarLugarTask from "../tasks/ActualizarLugarTask";
import './scss/reservacion.scss';


interface FormularioActualizarLugarProps {
    lugar: Lugar;
}

export default function FormularioActualizarLugar({ lugar }: FormularioActualizarLugarProps) {
    const [nombre, setNombre] = useState(lugar.nombre);
    const [descripcion, setDescripcion] = useState(lugar.descripcion);
    const [direccion, setDireccion] = useState(lugar.direccion);
    const [telefono, setTelefono] = useState(lugar.telefono);
    const [imagen, setImagen] = useState(lugar.imagen);
    const id = lugar.id;
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () =>  setShow(false);
    const handleShow = () => setShow(true);

    async function handleFormActualizar(event: FormEvent) {
        event.preventDefault();
        try {
            const actualizarLugarTask = new ActualizarLugarTask(
                new Lugar(id, nombre, descripcion, direccion, telefono, imagen)
            );
            await actualizarLugarTask.execute();
            navigate('/lugares');
        } catch (e) {
            switch ((e as Error).message) {
                case 'ErrorFormularioIncompleto':
                    window.alert('Faltan campos por llenar');
                    break;
                case 'ErrorLugarExistente':
                    window.alert('Ya existe un lugar existente');
                    break;
                default:
                    window.alert('Ha ocurrido un error desconocido');
            }
        }
    }
    function handleFormControlChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valor = event.target.value;

        switch (event.target.name) {
            case 'nombre':
                setNombre(valor);
                break;
            case 'descripcion':
                setDescripcion(valor);
                break;
            case 'direccion':
                setDireccion(valor);
                break;
            case 'telefono':
                setTelefono(valor);
                break;
            default:
                return;
        }
    }

    return (
        <>
            <h1 className="titulo"><span>Modificar lugar</span></h1>
            <div className="dialog-wrapper animated bounceInUp">
                <div className="dialog-form">
                    <Form>
                        <Form.Group className="orilla">
                            <Form.Label htmlFor="txtName">Nombre del Lugar: </Form.Label>
                            <Form.Control size="sm" type="text" name="nombre" id="txtName" value={nombre} onChange={handleFormControlChange} required />
                        </Form.Group>
                        <Form.Group className="orilla">
                            <Form.Label htmlFor="txtEvento">Dirección: </Form.Label>
                            <Form.Control size="sm" type="text" name="direccion" id="txtEvento" value={direccion} onChange={handleFormControlChange} required />
                        </Form.Group>
                        <Form.Group className="orilla">
                            <Form.Label htmlFor="txtTelefono">Telefono: </Form.Label>
                            <Form.Control size="sm" type="phone" name="telefono" id="txtTelefono" value={telefono} onChange={handleFormControlChange} placeholder="000 000 00 00" required />
                        </Form.Group>
                        <Form.Group className="orilla">
                            <Form.Label htmlFor="txtEmail">Descripcion: </Form.Label>
                            <Form.Control size="sm" as="textarea" type="text" rows={3} name="descripcion" id="txtMensaje" value={descripcion} onChange={handleFormControlChange} required/>
                        </Form.Group>
                    </Form>
                    <p>
                            <Button onClick={handleShow} variant="primary" type="submit" className="dialog-form">
                                Actualizar
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Actualizar lugar</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>¿Desea actualizar este lugar? </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                    <Button variant="primary" name="txtAceptar" onClick={handleFormActualizar}>Actualizar</Button>
                                </Modal.Footer>
                            </Modal>
                        </p>
                </div>
            </div>
        </>
    )
}