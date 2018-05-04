import React, { Component } from 'react';
import { Container, Dropdown, Menu } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import RegistroAlumno from './components/alumnos/RegistroAlumno';
import ListaAlumnos from './components/alumnos/ListaAlumnos';
import EditarAlumno from './components/alumnos/EditarAlumno';
import RegistroMaestro from './components/maestros/RegistroMaestro';
import Pagos from './components/pagos/Pagos';
import RegistroPago from './components/pagos/RegistroPago';
//import LoginForm from './components/LoginForm';
import ListaMaestros from './components/maestros/ListaMaestros';
import RegistroGrupos from './components/grupos/RegistroGrupos';
import ListaGrupos from './components/grupos/ListaGrupos';
import AsignacionMateria from './components/kardex/AsignacionMateria';
import KardexAlumno from './components/kardex/KardexAlumno';
import LoginForm from './components/login/LoginForm';
import SignUp from './components/login/SignUp';
import firebase from 'firebase';
import config from './config';
//import NoMatch from './components/NoMatch';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null,
      redirect: false
    };
  }

  componentDidMount(){
    firebase.initializeApp(config.firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if(user){ this.setState({currentUser: user, redirect: false}); }else{ this.setState({currentUser: null, redirect: true}); }
    });
  }

  render() {
    const CerrarSesion = (
      <Menu.Menu position='right'>
        <Menu.Item as='a' onClick={this.logoutClicked.bind(this)}>Cerrar Sesión</Menu.Item>
      </Menu.Menu>
    );

    return (
      <div>
        <Router>
          <div>
            <Menu fixed='top' inverted>
              <Container>
                <Menu.Item as='a' header>
                  SICECUI
                </Menu.Item>
                <Menu.Item as='a'>Inicio</Menu.Item>

                {this.state.currentUser !== null ?
                  <Dropdown item simple text='Acciones' closeOnChange={true}>
                    <Dropdown.Menu>

                      <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>Alumnos</span>
                        <Dropdown.Menu>
                        <Dropdown.Item><Link to="/alumno/registro" style={{color: 'black'}}>Registro de Alumnos</Link></Dropdown.Item>
                      <Dropdown.Item><Link to="/alumno/lista" style={{color: 'black'}}>Lista de Alumnos</Link></Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>
                      
                      <Dropdown.Divider />
                      
                      <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>Maestros</span>
                        <Dropdown.Menu>
                          <Dropdown.Item><Link to="/maestro/registro" style={{color: 'black'}}>Registro de Maestros</Link></Dropdown.Item>
                          <Dropdown.Item><Link to="/maestro/lista" style={{color: 'black'}}>Lista de Maestros</Link></Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>

                      <Dropdown.Divider />
                      
                      <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>Pagos</span>
                        <Dropdown.Menu>
                          <Dropdown.Item><Link to="/pagos/lista" style={{color: 'black'}}>Lista de Pagos</Link></Dropdown.Item>
                          <Dropdown.Item><Link to="/pagos/registro" style={{color: 'black'}}>Registro de Pago</Link></Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>

                      <Dropdown.Divider />
                      
                      <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>Grupos</span>
                        <Dropdown.Menu>
                          <Dropdown.Item><Link to="/grupos/registro" style={{color: 'black'}}>Registro de Grupos</Link></Dropdown.Item>
                          <Dropdown.Item><Link to="/grupos/lista" style={{color: 'black'}}>Lista de Grupos</Link></Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>

                      <Dropdown.Divider />
                      
                      <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>Kardex</span>
                        <Dropdown.Menu>
                          <Dropdown.Item><Link to="/kardex/registro" style={{color: 'black'}}>Asignación de Materias</Link></Dropdown.Item>
                          <Dropdown.Item><Link to="/kardex/alumno" style={{color: 'black'}}>Kardex de Alumno</Link></Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>
                : null}

                {this.state.currentUser !== null ? CerrarSesion : null}
                {this.state.redirect ? <Redirect to='/login' /> : null}
              </Container>
            </Menu>

            <Container fluid style={{ marginTop: '7em' }}>
              <Switch>
                <Route path="/maestro/registro" component={RegistroMaestro}></Route>
                <Route path="/maestro/lista" component={ListaMaestros}></Route>
                <Route path="/alumno/registro" component={RegistroAlumno}></Route>
                <Route path="/alumno/lista" component={ListaAlumnos}></Route>
                <Route path="/alumno/editar/:id" component={EditarAlumno}></Route>
                <Route path="/pagos/lista" component={Pagos}></Route>
                <Route path="/pagos/registro" component={RegistroPago}></Route>
                <Route path="/grupos/registro" component={RegistroGrupos}></Route>
                <Route path="/grupos/lista" component={ListaGrupos}></Route>
                <Route path="/kardex/registro" component={AsignacionMateria}></Route>
                <Route path="/kardex/alumno" component={KardexAlumno}></Route>
                <Route path="/login" component={LoginForm}></Route>
                <Route path="/signup" component={SignUp}></Route>
              </Switch>
            </Container>
          </div>
        </Router>
      </div>
    );
  }

  logoutClicked(){
    firebase.auth().signOut().then(() => {
      this.setState({currentUser: null, redirect: true});
    }).catch((err) => {
      console.log('error al cerrar sesion');
    });
  }
}

export default App;