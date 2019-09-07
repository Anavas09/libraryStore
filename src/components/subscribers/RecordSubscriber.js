import React from 'react';

//Style
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import PropTypes from 'prop-types';

function RecordSubscriber({ alumno }){
  return (
    <Card className="my-3">
      <CardHeader tag="h3" className="bg-primary text-white">
        Datos del Solicitante
      </CardHeader>
      <CardBody>
        <CardText className="font-weight-bold">
          Nombre: {''}
          <span className="font-weight-normal">
            {alumno.nombre}
          </span>
        </CardText>
        <CardText className="font-weight-bold">
          Codigo: {''}
          <span className="font-weight-normal">
            {alumno.codigo}
          </span>
        </CardText>
        <CardText className="font-weight-bold">
          Carrera: {''}
          <span className="font-weight-normal">
            {alumno.carrera}
          </span>
        </CardText>
      </CardBody>
    </Card>
  );
};

RecordSubscriber.propTypes = {
  alumno: PropTypes.object,
};

export default RecordSubscriber;