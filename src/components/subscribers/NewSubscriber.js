import React, { useState } from "react";
import { Link } from "react-router-dom";

//Style
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Redux
import { firestoreConnect } from "react-redux-firebase";

import PropTypes from "prop-types";

function NewSubscriber(props) {

  const initialState = {
    nombre: '',
    apellido: '',
    carrera: '',
    codigo: ''
  }

  const [suscriptor, setSuscriptor] = useState(initialState)

  const handleOnChange = (e) => {
    setSuscriptor({
      ...suscriptor,
      [e.target.name]: e.target.value
    })
  }

  const agregarSuscriptor = (e) => {
    e.preventDefault();

    //Extraer valores del state
    const nuevoSuscriptor = {...suscriptor}
    //Extraer firestore de los props
    const { firestore, history } = props
    //Guardarlo en la base de datos
    firestore.add({ collection: 'suscriptores' }, nuevoSuscriptor)
      .then(() => {
        //Limpiar el state
        setSuscriptor(initialState)
        //Redireccionar a la lista de suscriptores
        console.info('Added');
        history.push('/subscribers')
      })
  }

  return (
    <Row>
      <Col className="col-12 mb-4">
        <Link to={'/subscribers'} className='btn btn-secondary'>
          <FontAwesomeIcon icon="arrow-circle-left" /> Volver al listado
        </Link>
      </Col>
      <Col className="mb-4">
        <h2>
          <FontAwesomeIcon icon="user-plus" /> Nuevo suscriptor
        </h2>

        <Row className="justify-content-center">
          <Col md="8" className="mt-5">
            <Form onSubmit={agregarSuscriptor}>
              <FormGroup>
                <Label>Nombre:</Label>
                <Input
                  type="text"
                  name="nombre"
                  placeholder="Nombre del Suscriptor"
                  onChange={handleOnChange}
                  value={suscriptor.nombre}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Apellido:</Label>
                <Input
                  type="text"
                  name="apellido"
                  placeholder="Apellido del Suscriptor"
                  required
                  onChange={handleOnChange}
                  value={suscriptor.apellido}
                />
              </FormGroup>
              <FormGroup>
                <Label>Carrera:</Label>
                <Input
                  type="text"
                  name="carrera"
                  placeholder="Carrera del Suscriptor"
                  required
                  onChange={handleOnChange}
                  value={suscriptor.carrera}
                />
              </FormGroup>
              <FormGroup>
                <Label>Código:</Label>
                <Input
                  type="text"
                  name="codigo"
                  placeholder="Código del Suscriptor"
                  required
                  onChange={handleOnChange}
                  value={suscriptor.codigo}
                />
              </FormGroup>

              <input
                type="submit"
                className="btn btn-success"
                value="Agregar Suscriptor"
              />
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

NewSubscriber.propTypes = {
  firestore: PropTypes.object.isRequired,
};

export default firestoreConnect()(NewSubscriber);
