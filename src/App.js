import React, { Component } from 'react';
import { Container, Dropdown, Menu } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import RegistroAlumno from './components/RegistroAlumno';
import ListaAlumnos from './components/ListaAlumnos';
import EditarAlumno from './components/EditarAlumno';
import RegistroMaestro from './components/RegistroMaestro';
import Pagos from './components/pagos/Pagos';
import searchTest from './components/search/searchTest';
//import NoMatch from './components/NoMatch';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Menu fixed='top' inverted>
              <Container>
                <Menu.Item as='a' header>
                  Project Name
                </Menu.Item>
                <Menu.Item as='a'>Home</Menu.Item>

                <Dropdown item simple text='Acciones' closeOnChange={true}>
                  <Dropdown.Menu>
                    <Dropdown.Header>Alumnos</Dropdown.Header>
                    <Dropdown.Item><Link to="/alumno/registro" style={{color: 'black'}}>Registro de Alumnos</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/alumno/lista" style={{color: 'black'}}>Lista de Alumnos</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Maestros</Dropdown.Header>
                    <Dropdown.Item><Link to="/maestro/registro" style={{color: 'black'}}>Registro de Maestros</Link></Dropdown.Item>
                    <Dropdown.Item>
                      <i className='dropdown icon' />
                      <span className='text'>Pagos</span>
                      <Dropdown.Menu>
                        <Dropdown.Item><Link to="/pagos" style={{color: 'black'}}>Lista de Pagos</Link></Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Container>
            </Menu>

            <Container fluid style={{ marginTop: '7em' }}>
              <Route path="/maestro/registro" component={RegistroMaestro}></Route>
              <Route path="/alumno/registro" component={RegistroAlumno}></Route>
              <Route path="/alumno/lista" component={ListaAlumnos}></Route>
              <Route path="/alumno/editar/:id" component={EditarAlumno}></Route>
              <Route path="/pagos" component={Pagos}></Route>
              <Route path="/search" component={searchTest}></Route>
              {/*<Route component={NoMatch}/>*/}
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
