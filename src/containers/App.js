import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import { Image, Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import OrderHelper from '../containers/OrderHelper'
import TrayIntegration from '../containers/TrayIntegration'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Dashboard from './Dashboard';

const cssImport = <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
const cssStylesheet = <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous" />

class App extends Component {
  render() {
    return (
      <div>
        {cssImport}
        {cssStylesheet}
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/dashboard">
                <Image src={"/assets/picktita-logo-fundo.png"} style={{ width: 100, marginTop: -7 }} />
              </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav bsStyle="tabs">
            <NavItem eventKey={1} href="/orderHelper">
              Planilha de Pedido
            </NavItem>
            <NavItem eventKey={2} href="/trayIntegration">
              Integração Tray
            </NavItem>
            <NavDropdown eventKey={4} title="Integração Tray" id="nav-dropdown">
              <MenuItem eventKey={4.1} href="/">Lstagem de Produtos</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={4.2} href="/trayIntegration">Atualização de Estoque</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div>
          <Route path="/" exact component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/orderHelper" component={OrderHelper} />
          <Route path="/trayIntegration" component={TrayIntegration} />
        </div>
      </div>
    );
  }
}

export default App;
