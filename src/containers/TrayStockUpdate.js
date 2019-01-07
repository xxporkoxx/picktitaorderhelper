import { Row, Col, Jumbotron, Table } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrayIntegrationActions from '../actions';
import Dropzone from 'react-dropzone';
import classNames from 'classnames'
import UploadFileParse from '../components/UploadFileParse'

const baseStyle = {
    width: 200,
    height: 34,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
};

export class TrayStockUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trayApiState: {
                uploadedContent: {
                    fileAccepted: false,
                    numberOfProducts: 0,
                    parsedProducts: [],
                    productsNotFounded: []
                }
            }
        }

        this.onDrop = this.onDrop.bind(this)
    }

    onDrop(acceptedFile, rejectedFile) {
        if (rejectedFile.length > 0) {
            alert("Arquivo não suportado, escolha um arquivo de Texto (.txt)")
        }
        else {
            const fileReader = new FileReader();
            fileReader.onloadend = (event) => {
                let textFile = event.target.result;
                let parsedProducts = UploadFileParse(textFile);

                if (parsedProducts !== null) {
                    let uploadedContent = {
                        fileAccepted: true,
                        numberOfProducts: parsedProducts.length,
                        parsedProducts,
                        productsNotFounded: []
                    }
                    this.props.save_uploaded_products(uploadedContent)
                    this.setState({
                        trayApiState: {
                            uploadedContent
                        }
                    })
                }
                else {
                    alert("Arquivo não suportado, adicione um arquivo contendo apenas referências que sigam o padrão: ID|REF|NOME|ESTOQUE e uma quebra de linha no final")
                }

            };

            fileReader.readAsText(acceptedFile[0]);
        }
    }

    render() {
        let { fileAccepted, numberOfProducts, parsedProducts } =
            this.state.trayApiState.uploadedContent
        let mappedHtmlProductTableContent = null;

        if (fileAccepted !== false) {
            mappedHtmlProductTableContent = parsedProducts.map(
                (product) => {
                    return (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.reference}</td>
                            <td>{product.name}</td>
                            <td>{product.stock}</td>
                        </tr>
                    )
                }
            );
        }

        return (
            <div>
                <Jumbotron >
                    <div style={{ marginLeft: '15px', marginRight: '15px' }}>
                        <h2>Atualização de Estoque de Produtos</h2>
                        <p>
                            Fazendo o Upload de um arquivo abaixo contendo várias linhas na formatação correta,
                            todos os produtos listados deverão estar previamente integrados na plataforma
                            e terão seu estoque atualizado. O arquivo deve ser formatado da forma:
                            ID|REF|NOME|ESTOQUE
                    </p>
                    </div>
                </Jumbotron>
                <Row style={{ marginLeft: '15px', marginRight: '15px' }}>
                    <Col md={4} sm={4} xs={6}>
                        <Dropzone onDrop={this.onDrop} accept="text/plain" multiple={false} >
                            {({ getRootProps, getInputProps, isDragActive, onClick }) => {
                                return (
                                    <div
                                        {...getRootProps()}
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
                    <Col>
                        <p> Status do Arquivo: {fileAccepted ? "Aceito" : "Irregular"} </p>
                        <p> Número total de produtos: {numberOfProducts} </p>
                    </Col>
                </Row>
                <Table
                    striped bordered condensed hover
                    style={{ margin: '10px'}}
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Referência</th>
                            <th>Nome</th>
                            <th>Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mappedHtmlProductTableContent}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.trayApiState.auth,
    products: state.trayApiState.products,
    uploadedContent: state.trayApiState.uploadedContent
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...TrayIntegrationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TrayStockUpdate);