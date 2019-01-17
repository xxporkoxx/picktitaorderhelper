import { Row, Col, Jumbotron, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrayIntegrationActions from '../actions';
import Dropzone from 'react-dropzone';
import classNames from 'classnames'
import UploadFileParse from '../components/UploadFileParse'
import { TextTruncateIndicator } from '../utils/TextTruncateIndicator';
import { VariantTableComponent } from '../components/VariantTableComponent'

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

        this.onDrop = this.onDrop.bind(this);
        this.UpdateListedProductsStock = this.UpdateListedProductsStock.bind(this);
    }

    UpdateListedProductsStock() {
        this.props.tray_refresh_all_products(this.props.trayApiState.uploadedContent.parsedProducts)
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
                    let productsNoReference = parsedProducts.map(({ Product }) => {
                        if (!Product.Variant.length > 0)
                            return !Product.reference ? Product.id : null;
                        else {
                            return Product.Variant.map(variant => !variant.reference ? variant.id : null)
                        }

                    }).reduce((a, b) => a.concat(b), []).filter(item => item !== null)
                    let productsNegativeStock = parsedProducts.map(({ Product }) => {
                        if (!Product.Variant.length > 0)
                            return Product.stock < 0 ? Product.id : null;
                        else {
                            return Product.Variant.map(variant => variant.stock < 0 ? variant.id : null)
                        }
                    }).reduce((a, b) => a.concat(b), []).filter(item => item !== null)

                    let uploadedContent = {
                        fileAccepted: true,
                        numberOfProducts: parsedProducts.length,
                        parsedProducts,
                        productsNoReference,
                        productsNegativeStock
                    }

                    this.props.save_uploaded_products(uploadedContent)
                }
                else {
                    alert("Arquivo não suportado, adicione um arquivo contendo apenas referências que sigam o padrão: ID|REF|NOME|ESTOQUE e uma quebra de linha no final")
                }

            };

            fileReader.readAsText(acceptedFile[0]);
        }
    }



    render() {
        let { fileAccepted, numberOfProducts, parsedProducts, productsNoReference, productsNegativeStock } =
            this.props.trayApiState.uploadedContent
        let { refreshedProductsStatus } = this.props.trayApiState;

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
                    <Col lg={3} md={3} sm={3} xs={6}>
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
                    <Col lg={3} md={3} sm={3} xs={6}>
                        <p> <b>Status do Arquivo:</b> {fileAccepted ? "Aceito" : "Irregular"} </p>
                        <p> <b>Número total de produtos:</b> {numberOfProducts} </p>
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={6}>
                        {TextTruncateIndicator("Produtos sem referência: ", productsNoReference)}
                        {TextTruncateIndicator("Produtos com estoque negativo: ", productsNegativeStock)}
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={6}>
                        <Button
                            bsStyle="primary"
                            style={{ margin: '10px', marginLeft: '20px' }}
                            disabled={!fileAccepted}
                            onClick={() => this.UpdateListedProductsStock()}>
                            Atualizar Estoque dos Produtos Listados
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {VariantTableComponent(parsedProducts, refreshedProductsStatus)}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    trayApiState: state.trayApiState
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...TrayIntegrationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TrayStockUpdate);