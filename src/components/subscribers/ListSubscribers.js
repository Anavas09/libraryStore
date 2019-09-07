import React from "react";
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

import PropTypes from "prop-types";

function ListSubscribers({ firestore, suscriptores }) {
  if (!suscriptores) return <Spinner />;

  const eliminarSuscriptor = (id) => {
    firestore.delete({
      collection: 'suscriptores',
      doc: id 
    }).then(console.info('Delete'))
  }

  return (
    <Row>
      <Col md="12" className="mb-4">
        <Link to="/subscribers/new" className="btn btn-primary">
          <FontAwesomeIcon icon="plus" /> Nuevo Suscriptor
        </Link>
      </Col>
      <Col md="8">
        <h2>
          <FontAwesomeIcon icon="users" /> Suscriptores
        </h2>
      </Col>

      <Table className="mt-4" striped>
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscriptores.map(suscriptor => {
            return (
              <tr key={suscriptor.id}>
                <td>
                  {suscriptor.nombre} {suscriptor.apellido}
                </td>
                <td>{suscriptor.carrera}</td>
                <td>
                  <Link
                    to={`/subscribers/show/${suscriptor.id}`}
                    className="btn btn-success btn-block"
                  >
                    <FontAwesomeIcon icon="angle-double-right" /> Más
                    Información
                  </Link>
                  <Button
                    color="danger"
                    block
                    onClick={() => eliminarSuscriptor(suscriptor.id)}
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
}

ListSubscribers.propTypes = {
  firestore: PropTypes.object.isRequired,
  suscriptores: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "suscriptores" }]),
  connect((state, props) => {
    return {
      suscriptores: state.firestore.ordered.suscriptores
    };
  })
)(ListSubscribers);
