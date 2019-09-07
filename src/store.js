import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/* Custom Reducer */
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer';

//Configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyDy3gfkbt-GJexBqlp5hQ4GBmP9HGtoG_M",
    authDomain: "bibliostore-cae10.firebaseapp.com",
    databaseURL: "https://bibliostore-cae10.firebaseio.com",
    projectId: "bibliostore-cae10",
    storageBucket: "bibliostore-cae10.appspot.com",
    messagingSenderId: "1098837531920",
    appId: "1:1098837531920:web:607ea5770253ec71"
};

//Inicializar firebase
firebase.initializeApp(firebaseConfig);

//Configurar react-redux-firebase
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

//Crear el enhancer con compose
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore)

//Reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    usuario: buscarUsuarioReducer
})

//State inicial
const initialState = {};

//Crear store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store