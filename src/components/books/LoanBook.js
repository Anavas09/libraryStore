import React, { useState } from "react";
import { Link } from "react-router-dom";

//Style
import { Alert, Button, Col, Form, FormGroup, Input, Row } from "reactstrap";
import Spinner from "../layout/Spinner";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

//Redux Actions
import { buscarUsuario } from "../../actions/buscarUsuarioAction";

import PropTypes from "prop-types";
import RecordSubscriber from "../subscribers/RecordSubscriber";

function LoanBook(props) {

  const [busqueda, setBusqueda] = useState('');
  const [noResultado, setNoResultado] = useState(false)

  const handleOnChange = e => {
    setBusqueda(e.target.value);
    console.log(busqueda)
  };

  //Almacena los datos del alumno que solicita el prestamo
  const solicitarPrestamo = () => {
    const { usuario } = props

    //Fecha de Alta o solicitud del libro
    usuario.fecha_solicitud = new Date().toLocaleDateString();

    //No se pueden mutar los props, tomar una copia y crear un arreglo nuevo
    let prestados = [];
    prestados = [...props.libro.prestados, usuario]

    //Copiar el objeto y agregar los prestados
    const libroActualizado = {...props.libro}

    //Eliminar los prestados anteriores
    delete libroActualizado.prestados;

    //Asignar los prestados
    libroActualizado.prestados = prestados;

    //Obtener firestore, history y libro desde props
    const { firestore, history } = props;

    //Almacenar en la base de datos
    firestore.update({
      collection: 'libros',
      doc: libroActualizado.id
    }, libroActualizado).then(history.push('/'))
  }

  //Buscar Alumno por Código
  const buscarAlumno = (e) => {
    e.preventDefault();

    //Obtener el valor a buscar

    //Extraer buscarUsuario y firestore
    
    const { buscarUsuario, firestore } = props

    //Hacer la consulta
    const coleccion = firestore.collection('suscriptores');

    const consulta = coleccion.where("codigo", "==", busqueda).get();

    //Leer los resultados
    consulta.then(result => {
      if(result.empty){
        console.log('Empty')
        //Almacenar en redux un objeto vacío
        buscarUsuario({})
        //Actualizar el state en base al resultado
        setNoResultado(true)
      }else{
        console.log('Find')
        //Almacenar el resultado de la busqueda en redux
        buscarUsuario(result.docs[0].data())
        //Actualizar el state en base al resultado
        setBusqueda('')
        setNoResultado(false)
      }
    })
  }

  const { libro, usuario } = props

  //Mostrar spinner
  if (!libro) return <Spinner />

  let fichaAlumno, btnSolicitar;

  if(usuario.nombre){
    fichaAlumno = <RecordSubscriber alumno={usuario} />
    btnSolicitar = <Button
                      onClick={solicitarPrestamo}
                      color="primary"
                      block
                    >
                      Solicitar Prestamo
                    </Button>
  }else{
    fichaAlumno = null;
    btnSolicitar = null;
  }

  let msjResultado = '';
  if (noResultado){
    msjResultado = <Alert
                      fade
                      color="danger"
                      className="font-weight-bold text-center"
                    >No hay resultados para ese código.
                    </Alert>
  }else{
    msjResultado = null;
  }

  return (
    <Row>
      <Col className="col-12 mb-4">
        <Link to={'/'} className='btn btn-secondary'>
          <FontAwesomeIcon icon="arrow-circle-left" /> Volver al listado
        </Link>
      </Col>
      <Col>
        <h2>
          <FontAwesomeIcon icon="book" /> Solicitar Prestamo: {libro.titulo}
        </h2>

        <Row className="justify-content-center">
          <Col md="8" className="mt-5">
            <Form onSubmit={buscarAlumno} className="mb-4">
              <legend className="text-center">
                Buscar Suscriptor Por Código
              </legend>
              <FormGroup>
                <Input
                  type="text"
                  name="busqueda"
                  placeholder="Código del Suscriptor"
                  required
                  onChange={handleOnChange}
                />
              </FormGroup>

              <Input
                type="submit"
                className="btn btn-success"
                value="Buscar Alumno"
              />
            </Form>
            {/* Muestra la ficha del alumno y el botón para solicitar el prestamo */}
            {fichaAlumno}
            {btnSolicitar}

            {/* Muestra un mensaje cuando no hay resultados en la busqueda */}
            {msjResultado}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

LoanBook.propTypes = {
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
  connect(({ firestore: { ordered }, usuario }, props) => {
    return {
      libro: ordered.libro && ordered.libro[0],
      usuario: usuario
    };
  }, { buscarUsuario })
)(LoanBook);