import React, { useState } from "react";

//Style
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Redux
import { firebaseConnect } from "react-redux-firebase";

import PropTypes from 'prop-types';

function Login(props){

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  //Iniciar Sesión
  const iniciarSesion = (e) => {
    e.preventDefault()

    //Extraer firebase de los props
    const { firebase } = props

    //Extraer el state
    const { email, password } = credentials

    //Authenticar el usuario
    firebase.login({
      email,
      password
    })
      .then(res => console.log('Login'))
      .catch(err => console.error(err))
  }

  //Almacena lo que el usuario escribe en el state
  const handleOnChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Row className="justify-content-center">
      <Col md="5">
        <Card className="mt-5">
          <CardBody>
            <h2 className="text-center py-4">
              <FontAwesomeIcon icon="lock"/>{' '}
              Iniciar Sesión
            </h2>
            <Form onSubmit={iniciarSesion}>
              <FormGroup>
                <label>Email:</label>
                <Input
                  type="email"
                  name="email"
                  required
                  value={credentials.email}
                  onChange={handleOnChange}
                />

                <label>Password:</label>
                <Input
                  type="password"
                  name="password"
                  required
                  value={credentials.password}
                  onChange={handleOnChange}
                />
              </FormGroup>
              <Button color="success" type="submit" block>
                Iniciar Sesión
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export default firebaseConnect()(Login);