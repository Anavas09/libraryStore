import React from "react";
import { Link } from "react-router-dom";

//Style
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, Col, Row } from "reactstrap";
import Spinner from "../layout/Spinner";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

function Book(props) {

  const { libro } = props

  const devolverLibro = (id) => {
    //Extraer firestore
    const { firestore } = props;

    //Copia del libro
    const libroActualizado = {...libro}

    //Eliminar al alumno que devuelve el libro del arreglo prestados
    const prestados = libroActualizado.prestados.filter(el => el.codigo !== id)

    libroActualizado.prestados = prestados;

    //Actualizar en firebase
    firestore.update({
      collection: 'libros',
      doc: libroActualizado.id
    }, libroActualizado)
  }

  if (!libro) return <Spinner />

  const disponible = libro.existencia - libro.prestados.length

  let btnPrestamo, msjPrestamo;

  if(disponible > 0){
    btnPrestamo = <Link
                    to={`/books/loan/${libro.id}`}
                    className="btn btn-success"
                    >
                      Solicitar Prestamo
                  </Link>
  }

  if(libro.prestados.length > 0){
    msjPrestamo = <h3 className="my-2">Personas que tienen el Libro</h3>
  }


  return (
    <Row>
      <Col md="6" className="mb-4">
        <Link to={"/"} className="btn btn-secondary">
          <FontAwesomeIcon icon="arrow-circle-left" /> Volver al listado
        </Link>
      </Col>
      <Col>
        <Link to={`/books/edit/${libro.id}`} className="btn btn-primary float-right">
          <FontAwesomeIcon icon="pencil-alt" /> Editar Libro
        </Link>
      </Col>

      <hr className="mx-5 w-100"/>

      <Col>
        <h2 className="mb-4">
          {libro.titulo}
        </h2>

        <p>
          <span className="font-weight-bold">ISBN: </span>
          {libro.ISBN}
        </p>
        <p>
          <span className="font-weight-bold">Editorial: </span>
          {libro.editorial}
        </p>
        <p>
          <span className="font-weight-bold">Existencia: </span>
          {libro.existencia}
        </p>
        <p>
          <span className="font-weight-bold">Disponibles: </span>
          {disponible}
        </p>
        {/* Botón para solicitar prestamo de libro */}
        {btnPrestamo}

        {/* Muestra unan lista de personas que tienen una copia del libro */}
        {msjPrestamo}
        {libro.prestados.map(prestado => {
          return (
            <Card key={prestado.codigo} className="my-2">
              <CardHeader tag="h4">
                {prestado.nombre} {prestado.apellido}
              </CardHeader>
              <CardBody>
                <CardText className="font-weight-bold">
                  Código: {''}
                  <span className="font-weight-normal">
                    {prestado.codigo}
                  </span>
                </CardText>
                <CardText className="font-weight-bold">
                  Carrera: {''}
                  <span className="font-weight-normal">
                    {prestado.carrera}
                  </span>
                </CardText>
                <CardText className="font-weight-bold">
                  Fecha de Solicitud: {''}
                  <span className="font-weight-normal">
                    {prestado.fecha_solicitud}
                  </span>
                </CardText>
              </CardBody>
              <CardFooter>
                <Button
                  color="success"
                  className="font-weigth-bold"
                  onClick={()=> devolverLibro(prestado.codigo)}
                  >
                  Realizar Devolución
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </Col>
    </Row>
  );
}

Book.propTypes = {
  firestore: PropTypes.object.isRequired
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
)(Book);