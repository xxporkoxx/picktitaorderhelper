import React, { Component } from 'react';
import './App.css';
import { Route, Redirect } from "react-router-dom";
import { Image, Nav, Navbar, NavItem } from 'react-bootstrap';
import Dashboard from './Dashboard'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

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
          <Nav>
            <NavItem eventKey={1} href="/newFeature">
              Nova Funconalidade
            </NavItem>
          </Nav>
        </Navbar>
        <Redirect from="/" to="/dashboard" />
        <div>
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </div>
    );
  }
}

export default App;
