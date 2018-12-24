import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tray_auth } from './actions';

export class TrayIntegration  extends Component {

    constructor(props) {
      super(props);
       let initialState={
           inputValue: 'quakquer cosia'
       }
       this.state = { initialState };
    }

    inputChange = event => {
        this.setState({
          inputValue: event.target.value
        })
    } 

    render(){
        const {access_token, tray_auth} = this.props;
        const { inputValue } = this.state;

        return(
            <div style={{ paddingTop: '10px' }}>
                <input
                    onChange={this.inputChange}
                    type='text'
                    value={inputValue}
                />
                <Button onClick={() => tray_auth()}>
                    Incluir arquivo
                </Button>
                <h1>{access_token}</h1>
          </div>
        );
    }
}

const mapStateToProps = store => ({
    access_token: store.trayApiState.auth.access_token
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ tray_auth }, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(TrayIntegration);