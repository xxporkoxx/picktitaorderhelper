import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { Button, Row, Col } from 'react-bootstrap';
const { ExportCSVButton } = CSVExport;

const columns = [{
  dataField: 'reference',
  text: 'Ref'
}, {
  dataField: 'quantity',
  text: 'Qnt'
}, {
  dataField: 'color',
  text: 'Cor'
}, {
  dataField: 'p',
  text: 'P'
}, {
  dataField: 'm',
  text: 'M'
}, {
  dataField: 'g',
  text: 'G'
}, {
  dataField: 'um',
  text: '1'
}, {
  dataField: 'duas',
  text: '2'
}, {
  dataField: 'tres',
  text: '3'
}, {
  dataField: 'quatro',
  text: '4'
}, {
  dataField: 'seis',
  text: '6'
}, {
  dataField: 'oito',
  text: '8'
}, {
  dataField: 'dez',
  text: '10'
}, {
  dataField: 'doze',
  text: '12'
}, {
  dataField: 'quatorze',
  text: '14'
}, {
  dataField: 'price',
  text: 'Preço'
}, {
  dataField: 'total',
  text: 'Total'
}];

const divStyle = {
    margin: '10px'
};

export class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      products: [{
        reference: 1,
        name: "Exemplo",
        price: 120,
        quantity: 4,
        total: 480,
        color: "preto"
      }]
    }
    this.addLIne = this.addLIne.bind(this);
  }

  addLIne(){
    this.state.products.push({});
    this.setState({products: this.state.products});
  }

  render() {
    return (
      <div style={divStyle}>
        <ToolkitProvider
          keyField="id"
          data={this.state.products}
          columns={columns}
          exportCSV
        >
          {
            props => (
              <div>
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  striped
                  filter={filterFactory()}
                  cellEdit={cellEditFactory({ mode: 'click' })}
                />
                <Row>
                    <Button 
                      onClick={this.addLIne}
                      style={divStyle} bsStyle='primary'>
                        Adicionar Linha
                    </Button>
                </Row>
                <Row>
                  <Col xs={8} xsOffset={10}>
                    <ExportCSVButton bsStyle='success' {...props.csvProps}>Baixar relatório</ExportCSVButton>
                  </Col>
                </Row>
              </div>
            )
          }
        </ToolkitProvider>
      </div>
    )
  }
}

export default Dashboard
