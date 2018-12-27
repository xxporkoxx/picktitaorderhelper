import React from 'react'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'

const baseStyle = {
    width: 200,
    height: 34 ,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
  };

class DropZoneComponent extends React.Component {
    onDrop = (acceptedFiles, rejectedFiles) => {
        console.log(acceptedFiles);
        rejectedFiles? alert("Arquivo não suportado, escolha um arquivo de Texto (.txt)"):null
        acceptedFiles;
    }

   render() {
    return (
      <Dropzone onDrop={this.onDrop} accept="text/plain" >
        {({getRootProps, getInputProps, isDragActive}) => {

          return (
            <div
              {...getRootProps()}
              style = {baseStyle}
              className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
            >
              <input {...getInputProps()} />
              { <p>Clique ou Arraste um arquivo</p>}
            </div>
          )
        }}
      </Dropzone>
    );
  }
}

export default DropZoneComponent