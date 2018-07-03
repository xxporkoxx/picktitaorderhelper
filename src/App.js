import React, { Component } from 'react';
import './App.css';
import {Route, Link } from "react-router-dom";
import Dashboard from './Dashboard'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const cssImport = <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
const cssStylesheet = <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"/>

class App extends Component {
  render() {
    return (
      <div>
        {cssImport}
        {cssStylesheet}
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <div>
        <Route path="/dashboard" component={Dashboard}/>
      </div>
    </div>  
    );
  }
}

export default App;
