import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { dropZoneStyle } from '../constants/drop_zone_config'
import classNames from 'classnames'

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    backgroundColor: '#f1f1f1',
    padding: 5,
    borderRadius: 2,
    border: '1px solid #eaeaea',
    alignContent: 'center',
    justifyContent: 'center'
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
    backgroundColor: '#c7cbce',
    alignContent: 'center',
    justifyContent: 'center'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
};

export class PhotoManipulation extends Component {

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            files: []
        };
    }

    onDrop(acceptedFile, rejectedFile) {
        this.setState({
            files: acceptedFile.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        })

    }

    render() {
        const thumbs = this.state.files.map(file => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img
                        alt={file.name}
                        src={file.preview}
                        style={img}
                    />
                </div>
            </div>
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
                                        <center>
                                            <h4>Upload de Imagens</h4>
                                            {<p>Clique ou Arraste uma ou mais Imagens. <br /> Extenssões: .png, .jpeg, .jpg</p>}
                                            <input {...getInputProps()} />
                                        </center>
                                    </div>
                                    <center><h3>Prévia das Imagens</h3></center>
                                    <aside style={thumbsContainer}>
                                        {thumbs.length ? thumbs : <h5>Nenhum Produto Listado</h5>}
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