import { Row, Col, Jumbotron } from 'react-bootstrap';
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

export class TrayStockUpdate extends Component {

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
        return (
            <div>
                <Jumbotron>
                    <h2>Atualização de Estoque de Produtos</h2>
                    <p>
                        Fazendo o Upload de um arquivo abaixo contendo várias linhas na formatação correta,
                        todos os produtos listados deverão estar previamente integrados na plataforma
                        e terão seu estoque atualizado. O arquivo deve ser formatado da forma:
                        ID REF NOME ESTOQUE 
                    </p>
                </Jumbotron>;
                <Row>
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
                </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(TrayStockUpdate);