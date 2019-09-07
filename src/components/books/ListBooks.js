import React from 'react';
import { Link } from "react-router-dom";

//Style
import { Button, Col, Row, Table } from "reactstrap";
import Spinner from "../layout/Spinner";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import PropTypes from 'prop-types';

function ListBooks({ firestore, libros }) {

    if (!libros) return <Spinner />;

    const eliminarLibro = (id) => {
      firestore.delete({
        collection: 'libros',
        doc: id 
      }).then(console.info('Delete'))
    }

    return (
      <Row>
        <Col md="12" className="mb-4">
          <Link to="/books/new" className="btn btn-primary">
            <FontAwesomeIcon icon="plus" /> Nuevo Libro
          </Link>
        </Col>
        <Col md="8">
          <h2>
            <FontAwesomeIcon icon="book" /> Libros
          </h2>
        </Col>
  
        <Table className="mt-4" striped>
          <thead className="text-light bg-primary">
            <tr>
              <th>ISBN</th>
              <th>Título</th>
              <th>Editorial</th>
              <th>Existencia</th>
              <th>Disponibles</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map(libro => {
              return (
                <tr key={libro.id}>
                  <td>{libro.ISBN}</td>
                  <td>{libro.titulo}</td>
                  <td>{libro.editorial}</td>
                  <td>{libro.existencia}</td>
                  <td>{libro.existencia - libro.prestados.length}</td>
                  <td>
                    <Link
                      to={`/books/show/${libro.id}`}
                      className="btn btn-success btn-block"
                    >
                      <FontAwesomeIcon icon="angle-double-right" /> Más
                      Información
                    </Link>
                    <Button
                      color="danger"
                      block
                      onClick={() => eliminarLibro(libro.id)}
                      >
                        <FontAwesomeIcon icon="trash-alt" /> Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    );
};

ListBooks.propTypes = {
  firestore: PropTypes.object.isRequired,
  libros: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "libros" }]),
  connect((state, props) => {
    return {
      libros: state.firestore.ordered.libros
    };
  })
)(ListBooks);
