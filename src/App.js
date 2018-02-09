import React, { Component } from 'react';
import { Container, Dropdown, Menu } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import RegistroAlumno from './components/RegistroAlumno';
import ListaAlumnos from './components/ListaAlumnos';
import EditarAlumno from './components/EditarAlumno';
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

                <Dropdown item simple text='Dropdown' closeOnChange={true}>
                  <Dropdown.Menu>
                    <Dropdown.Item><Link to="/alumno/registro" style={{color: 'black'}}>Registro de Alumnos</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/alumno/lista" style={{color: 'black'}}>Lista de Alumnos</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Header Item</Dropdown.Header>
                    <Dropdown.Item>
                      <i className='dropdown icon' />
                      <span className='text'>Submenu</span>
                      <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Container>
            </Menu>

            <Container fluid style={{ marginTop: '7em' }}>
              <Route path="/alumno/registro" component={RegistroAlumno}></Route>
              <Route path="/alumno/lista" component={ListaAlumnos}></Route>
              <Route path="/alumno/editar/:id" component={EditarAlumno}></Route>
              {/*<Route component={NoMatch}/>*/}
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
