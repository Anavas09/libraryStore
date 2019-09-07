import React from "react";
import { Link } from "react-router-dom";

//Style
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Spinner from "../layout/Spinner";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import PropTypes from "prop-types";

function EditSubscriber(props) {

  const { suscriptor } = props;

  //Manejar inputs con refs
  const nombreInput = React.useRef();
  const apellidoInput = React.useRef();
  const carreraInput = React.useRef();
  const codigoInput = React.useRef();

  //Editar suscriptor en la base de datos
  const editarSuscriptor = (e) => {
    e.preventDefault()

    //Crear el objeto que se va a actualizar
    const suscriptorActualizado = {
      nombre: nombreInput.current.value,
      apellido: apellidoInput.current.value,
      carrera: carreraInput.current.value,
      codigo: codigoInput.current.value
    }

    //Extraer firestore, history y suscriptor de los props
    const { firestore, history, suscriptor } = props

    //Almacenar en la base de datos
    firestore.update({
      collection: 'suscriptores',
      doc: suscriptor.id
    }, suscriptorActualizado)
      .then(()=> {
        console.info('Updated')
        history.push('/subscribers')
      })

  }

  if (!suscriptor) return <Spinner /> 

  return (
    <Row>
      <Col className="col-12 mb-4">
        <Link to={'/subscribers'} className='btn btn-secondary'>
          <FontAwesomeIcon icon="arrow-circle-left" /> Volver al listado
        </Link>
      </Col>
      <Col className="mb-4">
        <h2>
          <FontAwesomeIcon icon="user-edit" /> Editar Suscriptor
        </h2>

        <Row className="justify-content-center">
          <Col md="8" className="mt-5">
            <Form onSubmit={editarSuscriptor}>
              <FormGroup>
                <Label>Nombre:</Label>
                <Input
                  type="text"
                  name="nombre"
                  placeholder="Nombre del Suscriptor"
                  innerRef={nombreInput}
                  defaultValue={suscriptor.nombre}
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
                  innerRef={apellidoInput}
                  defaultValue={suscriptor.apellido}
                />
              </FormGroup>
              <FormGroup>
                <Label>Carrera:</Label>
                <Input
                  type="text"
                  name="carrera"
                  placeholder="Carrera del Suscriptor"
                  required
                  innerRef={carreraInput}
                  defaultValue={suscriptor.carrera}
                />
              </FormGroup>
              <FormGroup>
                <Label>Código:</Label>
                <Input
                  type="text"
                  name="codigo"
                  placeholder="Código del Suscriptor"
                  required
                  innerRef={codigoInput}
                  defaultValue={suscriptor.codigo}
                />
              </FormGroup>

              <input
                type="submit"
                className="btn btn-success"
                value="Editar"
              />
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

EditSubscriber.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "suscriptores",
      storeAs: "suscriptor",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => {
    return {
      suscriptor: ordered.suscriptor && ordered.suscriptor[0]
    };
  })
)(EditSubscriber);
