import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { dropZoneStyle } from '../constants/drop_zone_config'
import classNames from 'classnames'

export class PhotoManipulation extends Component {

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            files: []
        };
    }

    onDrop(acceptedFile, rejectedFile) {
        this.setState({files: acceptedFile})
    }

    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));

        return (
            <div>
                <Alert>
                    Essa aba tem como função automatizar o tratamento de fundo, compressão e tamanho
                    das fotos de produtos tiradas dentro da loja com o objetivo de padronizar o conteúdo
                    a ser publicado em nosso Ecommerce e mídias sociais. <br />
                </Alert>
                <Row style={{ marginLeft: '15px', marginRight: '15px' }}>
                    <Dropzone onDrop={this.onDrop} accept="image/jpeg,image/jpg,image/png" multiple={true} >
                        {({ getRootProps, getInputProps, isDragActive, onClick }) => {
                            return (
                                <section>
                                    <div
                                        {...getRootProps()}
                                        style={dropZoneStyle}
                                        className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
                                    >
                                        <input {...getInputProps()} />
                                        {<p>Clique ou Arraste uma ou mais Imagens. <br /> Extenssões: .png, .jpeg, .jpg</p>}
                                    </div>
                                    <aside>
                                        <h4>Files</h4>
                                        <ul>{files}</ul>
                                    </aside>
                                </section>
                            )
                        }}
                    </Dropzone>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PhotoManipulation);