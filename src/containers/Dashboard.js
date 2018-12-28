import { Alert } from 'react-bootstrap';
import React, { Component } from 'react';

export class Dashboard extends Component {

    render(){
        return(
            <Alert>
                Esse Dashboard reune alguns utilitários
                 desenvolvidos unicamente para  <b> Picktita </b> 
                 escolha no menu a funcionalidade que deseja utilizar.
                 Qualquer dúvida falar com Diego.    
            </Alert>
        );
    }
}

export default Dashboard