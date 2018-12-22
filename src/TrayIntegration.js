import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';

export class TrayIntegration  extends Component {

    constructor(props) {
      super(props);
       let initialState={
           inputValue: ''
       }
       this.state = { initialState };
    }

    inputChange = event => {
        this.setState({
          inputValue: event.target.value
        })
    } 

    render(){
        const {newValue, clickButton} = this.props;
        const { inputValue } = this.state;

        return(
            <div style={{ paddingTop: '10px' }}>
                <input
                    onChange={this.inputChange}
                    type='text'
                    value={inputValue}
                />
                <Button onClick={() => clickButton(inputValue)}>
                    Incluir arquivo
                </Button>
                <h1>{newValue}</h1>
          </div>
        );
    }
}

const mapStateToProps = store => ({
    newValue: store.clickState.newValue
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ clickButton }, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(TrayIntegration);