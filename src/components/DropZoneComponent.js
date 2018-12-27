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

    onDrop = (acceptedFile, rejectedFile) => {
        console.log(acceptedFile);
        if(rejectedFile.length > 0 ){
            alert("Arquivo não suportado, escolha um arquivo de Texto (.txt)")
        }
        else{
            const fileReader = new FileReader();
            fileReader.onloadend = function(event) {
                let textFile = event.target.result;

                if(textFile.match("^[0-9]*$")){
                    console.log(textFile);
                    
                }
                else{
                    alert("Arquivo não suportado, adicione um arquivo contendo apenas referências separadas por uma quebra de linha")                    
                }
                
            };

            fileReader.readAsText(acceptedFile[0]);
        }
    }

   render() {
    return (
      <Dropzone onDrop={this.onDrop} accept="text/plain" multiple={false} >
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