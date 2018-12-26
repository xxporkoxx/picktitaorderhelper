import { Button, Table } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrayIntegrationActions from './actions';

export class TrayIntegration  extends Component {

    constructor(props) {
      super(props);
       let initialState={
           inputValue: '',
           trayApiState: {
                products: {},
            }
       }
       this.state = { initialState };
       
       this.refreshProductList = this.refreshProductList.bind(this);       
       this.fileUpload = this.fileUpload.bind(this);
    }

    componentDidMount(){
        this.props.tray_auth()
        .then(response => {
            this.props.tray_auth_success(response.data)
            this.refreshProductList();
        })
        .catch(error => {
            this.props.tray_auth_failure(error);
        });
    }

    refreshProductList(){
        this.props.tray_get_product(0, true)
        .then(response => {
            this.props.tray_get_product_success(response.data);
        })
        .catch(error => {
            this.props.tray_get_product_failure(error);
            alert(error);
        });
    }

    fileUpload(){
        
    }

    render(){
        const { access_token } = this.props.auth;
        let  productArray  = this.props.products ? this.props.products.Products : null;
        let  mappedProductArray = <tr/>;

        if(productArray !== null){
            mappedProductArray = productArray.map(
                ({Product}) => {
                    return(
                        <tr key={Product.id}>
                            <td>{Product.id}</td>
                            <td>{Product.name}</td>
                            <td>{Product.stock}</td>
                        </tr>
                    )
                }
            );
        }

        return(
            <div style={{ paddingTop: '10px' }}>
                <Button onClick={() => this.refreshProductList()}>
                    Recarregar Relatório de Produtos
                </Button>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mappedProductArray}
                    </tbody>
                </Table>;

          </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.trayApiState.auth,
    products: state.trayApiState.products
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...TrayIntegrationActions }, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(TrayIntegration);