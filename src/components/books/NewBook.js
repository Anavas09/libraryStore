import React, { useState } from "react";
import { Link } from "react-router-dom";

//Style
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Redux
import { firestoreConnect } from "react-redux-firebase";

import PropTypes from "prop-types";

function NewBook(props) {
  const initialState = {
    titulo: "",
    ISBN: "",
    editorial: "",
    existencia: ""
  };

  const [libro, setLibro] = useState(initialState);

  const handleOnChange = e => {
    setLibro({
      ...libro,
      [e.target.name]: e.target.value
    });
  };

  const agregarLibro = e => {
    e.preventDefault();

    //Extraer valores del state
    const nuevoLibro = { ...libro };
    //Agregar un arreglo de prestados vacío
    nuevoLibro.prestados = []
    //Extraer firestore de los props
    const { firestore, history } = props;
    //Guardarlo en la base de datos
    firestore.add({ collection: "libros" }, nuevoLibro).then(() => {
      //Limpiar el state
      setLibro(initialState);
      //Redireccionar a la lista de libros
      console.info('Added');
      history.push("/");
    });
  };

  return (
    <Row>
      <Col className="col-12 mb-4">
        <Link to={"/"} className="btn btn-secondary">
          <FontAwesomeIcon icon="arrow-circle-left" /> Volver al listado
        </Link>
      </Col>
      <Col className="mb-4">
        <h2>
          <FontAwesomeIcon icon="book" /> Nuevo Libro
        </h2>

        <Row className="justify-content-center">
          <Col md="8" className="mt-5">
            <Form onSubmit={agregarLibro}>
              <FormGroup>
                <Label>Titulo:</Label>
                <Input
                  type="text"
                  name="titulo"
                  placeholder="Titulo o Nombre del libro"
                  onChange={handleOnChange}
                  value={libro.titulo}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Editorial:</Label>
                <Input
                  type="text"
                  name="editorial"
                  placeholder="Editorial del Libro"
                  required
                  onChange={handleOnChange}
                  value={libro.editorial}
                />
              </FormGroup>
              <FormGroup>
                <Label>ISBN:</Label>
                <Input
                  type="text"
                  name="ISBN"
                  placeholder="ISBN del Libro"
                  required
                  onChange={handleOnChange}
                  value={libro.ISBN}
                />
              </FormGroup>
              <FormGroup>
                <Label>Existencia:</Label>
                <Input
                  type="number"
                  min="0"
                  name="existencia"
                  placeholder="Cantidad en Existencias"
                  required
                  onChange={handleOnChange}
                  value={libro.existencia}
                />
              </FormGroup>

              <input
                type="submit"
                className="btn btn-success"
                value="Agregar libro"
              />
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

NewBook.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NewBook);
