import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import PropTypes from 'prop-types';

class NavBar extends Component{

  state = {
    usuarioAutenticado: false
  }
  //Recibe los props automaticamente
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if(auth.uid){
      return { usuarioAutenticado: true}
    }else{
      return { usuarioAutenticado: false}
    }
  }

  cerrarSesion = () => {
    //Extraer firebase de los props
    const { firebase } = this.props;

    firebase.logout()
  }

  render(){

    const { usuarioAutenticado } = this.state

    const { auth } = this.props

    return (
      <div>
        <Navbar color="primary" dark expand="lg" className="mb-5">
          <Nav navbar>
            <NavbarBrand href="/" tag="h1" className="mb-0">
              Administrador de Biblioteca
            </NavbarBrand>
          </Nav>
          <NavbarToggler />
          <Collapse navbar>
            {usuarioAutenticado ? (
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <Link to="/" className="nav-link">Books</Link>
                </NavItem>
                <NavItem>
                  <Link to="/subscribers" className="nav-link">Subscribers</Link>
                </NavItem>
              </Nav>
              ):null
            }
            {usuarioAutenticado ? (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="#!" className="nav-link">
                    {auth.email}
                  </Link>
                </NavItem>
                <NavItem>
                  <Button
                    color="danger"
                    type="button"
                    onClick={this.cerrarSesion}
                  >Cerrar Sesión
                  </Button>
                </NavItem>
              </Nav>
              ) : null
            }
          </Collapse>
          </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(NavBar);