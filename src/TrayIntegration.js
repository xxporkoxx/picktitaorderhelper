import { Button } from 'react-bootstrap';
import React, { Component } from 'react';

export class TrayIntegration  extends Component {

    constructor(props) {
      super(props);
    }

    render(){
        return(
            <Button>
                Incluir arquivo
            </Button>
        );
    }
}

export default TrayIntegration