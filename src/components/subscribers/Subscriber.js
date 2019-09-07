import React from "react";
import { Link } from "react-router-dom";

//Style
import { Col, Row } from "reactstrap";
import Spinner from "../layout/Spinner";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import PropTypes from "prop-types";

const Subscriber = ({ suscriptor }) => {
  
  if (!suscriptor) return <Spinner />;

  return (
    <Row>
      <Col md="6" className="mb-4">
        <Link to={"/subscribers"} className="btn btn-secondary">
          <FontAwesomeIcon icon="arrow-circle-left" /> Volver al listado
        </Link>
      </Col>
      <Col>
        <Link to={`/subscribers/edit/${suscriptor.id}`} className="btn btn-primary float-right">
          <FontAwesomeIcon icon="pencil-alt" /> Editar
        </Link>
      </Col>

      <hr className="mx-5 w-100"/>

      <Col md="12">
        <h2 className="mb-4">
          {suscriptor.nombre} {suscriptor.apellido}
        </h2>

        <p>
          <span className="font-weight-bold">Carrera: </span>
          {suscriptor.carrera}
        </p>
        <p>
          <span className="font-weight-bold">Código: </span>
          {suscriptor.codigo}
        </p>
      </Col>
    </Row>
  );
};

Subscriber.propTypes = {
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
)(Subscriber);
