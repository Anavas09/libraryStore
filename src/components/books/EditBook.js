import React from 'react';
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

import PropTypes from 'prop-types';

function EditBook(props){

  const { libro } = props;

  //Manejar inputs con refs
  const tituloInput = React.useRef();
  const editorialInput = React.useRef();
  const ISBNInput = React.useRef();
  const existenciaInput = React.useRef();

  //Editar libro en la base de datos
  const editarLibro = (e) => {
    e.preventDefault()

    //Crear el objeto que se va a actualizar
    const libroActualizado = {
      titulo: tituloInput.current.value,
      editorial: editorialInput.current.value,
      ISBN: ISBNInput.current.value,
      existencia: existenciaInput.current.value
    }

    //Extraer firestore, history y suscriptor de los props
    const { firestore, history, libro } = props

    //Almacenar en la base de datos
    firestore.update({
      collection: 'libros',
      doc: libro.id
    }, libroActualizado)
      .then(()=> {
        console.info('Updated')
        history.push('/')
      })

  }

  if(!libro) return <Spinner />

  return (
    <Row>
      <Col className="col-12 mb-4">
        <Link to={'/'} className='btn btn-secondary'>
          <FontAwesomeIcon icon="arrow-circle-left" /> Volver al listado
        </Link>
      </Col>
      <Col className="mb-4">
        <h2>
          <FontAwesomeIcon icon="book" /> Editar Libro
        </h2>

        <Row className="justify-content-center">
          <Col md="8" className="mt-5">
            <Form onSubmit={editarLibro}>
              <FormGroup>
                <Label>Titulo:</Label>
                <Input
                  type="text"
                  name="titulo"
                  placeholder="Titulo o Nombre del libro"
                  innerRef={tituloInput}
                  defaultValue={libro.titulo}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Editorial:</Label>
                <Input
                  type="text"
                  name="editorial"
                  placeholder="Editorial del Libro"
                  innerRef={editorialInput}
                  required
                  defaultValue={libro.editorial}
                />
              </FormGroup>
              <FormGroup>
                <Label>ISBN:</Label>
                <Input
                  type="text"
                  name="ISBN"
                  placeholder="ISBN del Libro"
                  innerRef={ISBNInput}
                  required
                  defaultValue={libro.ISBN}
                />
              </FormGroup>
              <FormGroup>
                <Label>Existencia:</Label>
                <Input
                  type="number"
                  min="0"
                  name="existencia"
                  placeholder="Cantidad en Existencias"
                  innerRef={existenciaInput}
                  required
                  defaultValue={libro.existencia}
                />
              </FormGroup>

              <input
                type="submit"
                className="btn btn-success"
                value="Editar libro"
              />
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

EditBook.propTypes = {
  firestore: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "libros",
      storeAs: "libro",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => {
    return {
      libro: ordered.libro && ordered.libro[0]
    };
  })
)(EditBook);