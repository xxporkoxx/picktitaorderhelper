import { Button, Table, Row, Col } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrayIntegrationActions from '../actions';
import Dropzone from 'react-dropzone';
import classNames from 'classnames'

const baseStyle = {
    width: 200,
    height: 34,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
};

export class TrayIntegration extends Component {

    constructor(props) {
        super(props);
        let initialState = {
            inputValue: '',
            trayApiState: {
                products: {},
            }
        }
        this.state = { initialState };

        this.refreshProductList = this.refreshProductList.bind(this);
        this.fileDownload = this.fileDownload.bind(this);
    }

    componentDidMount() {
        this.props.tray_auth()
            .then(response => {
                this.props.tray_auth_success(response.data)
                this.refreshProductList();
            })
            .catch(error => {
                this.props.tray_auth_failure(error);
            });
    }

    refreshProductList() {
        this.props.tray_get_product(0, true)
            .then(response => {
                this.props.tray_get_product_success(response.data);
            })
            .catch(error => {
                this.props.tray_get_product_failure(error);
                alert(error);
            });
    }

    fileDownload() {

    }

    onDrop = (acceptedFile, rejectedFile) => {
        if (rejectedFile.length > 0) {
            alert("Arquivo não suportado, escolha um arquivo de Texto (.txt)")
        }
        else {
            const fileReader = new FileReader();
            fileReader.onloadend = function (event) {
                let textFile = event.target.result;

                if (textFile.match("[0-9]")) {
                    console.log(textFile);

                }
                else {
                    alert("Arquivo não suportado, adicione um arquivo contendo apenas referências separadas por uma quebra de linha")
                }

            };

            fileReader.readAsText(acceptedFile[0]);
        }
    }

    render() {
        const { access_token } = this.props.auth;
        let productArray = this.props.products ? this.props.products.Products : null;
        let mappedProductArray = <tr />;

        if (productArray !== null) {
            mappedProductArray = productArray.map(
                ({ Product }) => {
                    return (
                        <tr key={Product.id}>
                            <td>{Product.id}</td>
                            <td>{Product.reference}</td>
                            <td>{Product.name}</td>
                            <td>{Product.stock}</td>
                        </tr>
                    )
                }
            );
        }

        return (
            <div style={{ paddingTop: '10px' }}>
                <Row>
                    <Col md={4} sm={4} xs={6}>
                        <Button onClick={() => this.refreshProductList()}>
                            Recarregar Relatório de Produtos
                        </Button>
                    </Col>
                    <Col md={4} sm={4} xs={6}>
                        <Button onClick={() => this.fileDownload()}>
                            Baixar Relatório de Produtos
                        </Button>
                    </Col>
                    <Col md={4} sm={4} xs={6}>
                        <Dropzone onDrop={this.onDrop} accept="text/plain" multiple={false} >
                            {({ getRootProps, getInputProps, isDragActive, onClick }) => {
                                return (
                                    <div
                                        {...getRootProps(this.state)}
                                        style={baseStyle}
                                        className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
                                    >
                                        <input {...getInputProps()} />
                                        {<p>Clique ou Arraste um arquivo</p>}
                                    </div>
                                )
                            }}
                        </Dropzone>
                    </Col>
                </Row>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Referência</th>
                            <th>Nome</th>
                            <th>Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mappedProductArray}
                    </tbody>
                </Table>
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