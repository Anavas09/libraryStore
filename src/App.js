import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import store from './store';
import { Provider } from 'react-redux';

//Style
import { Container } from 'reactstrap';

//Layout
import NavBar from './components/layout/NavBar';

//Components
//Suscriptores
import Subscriber from './components/subscribers/Subscriber';
import ListSubscribers from './components/subscribers/ListSubscribers';
import EditSubscriber from './components/subscribers/EditSubscriber';
import NewSubscriber from './components/subscribers/NewSubscriber';

//Libros
import ListBooks from './components/books/ListBooks';
import Book from './components/books/Book';
import NewBook from './components/books/NewBook';
import EditBook from './components/books/EditBook';
import LoanBook from './components/books/LoanBook';
import Login from './components/auth/Login';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Container>
          <Switch>
            {/* Login */}
            <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
            
            { /* Libros */ }
            <Route exact path="/" component={UserIsAuthenticated(ListBooks)}/>
            <Route exact path="/books/new" component={UserIsAuthenticated(NewBook)}/>
            <Route exact path="/books/show/:id" component={UserIsAuthenticated(Book)}/>
            <Route exact path="/books/edit/:id" component={UserIsAuthenticated(EditBook)}/>
            <Route exact path="/books/loan/:id" component={UserIsAuthenticated(LoanBook)}/>
            
            { /* Suscriptores */ }
            <Route exact path="/subscribers" component={UserIsAuthenticated(ListSubscribers)}/>
            <Route exact path="/subscribers/new" component={UserIsAuthenticated(NewSubscriber)}/>
            <Route exact path="/subscribers/show/:id" component={UserIsAuthenticated(Subscriber)}/>
            <Route exact path="/subscribers/edit/:id" component={UserIsAuthenticated(EditSubscriber)}/>
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
