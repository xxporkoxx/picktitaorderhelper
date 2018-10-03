import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { Button, Row, Col, Modal } from 'react-bootstrap';
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
  dataField: 'one',
  text: '1'
}, {
  dataField: 'two',
  text: '2'
}, {
  dataField: 'three',
  text: '3'
}, {
  dataField: 'four',
  text: '4'
}, {
  dataField: 'six',
  text: '6'
}, {
  dataField: 'eight',
  text: '8'
}, {
  dataField: 'ten',
  text: '10'
}, {
  dataField: 'twelve',
  text: '12'
}, {
  dataField: 'fourteen',
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

  constructor(props) {
    super(props);
    this.state = { products: [] };
    for (let i = 0; i < 9; i++) {
      this.state.products.push({
        reference: 1000 + i,
        p: null,
        m: null,
        g: null,
        one: null,
        two: null,
        three: null,
        four: null,
        six: null,
        eight: null,
        ten: null,
        twelve: null,
        fourteen: null,
        price: null,
        quantity: null,
        total: null,
        color: null
      });
    }
    this.state.show = false;
    this.addLIne = this.addLIne.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  clearTable() {
    
  }

  handleClose() {this.setState({ show: false })}
  handleShow() {this.setState({ show: true })}

  addLIne() {
    let lastRowIndex = this.state.products.length - 1;
    let lastProductArrayElement = this.state.products[lastRowIndex];

    let newElement = {
      ...lastProductArrayElement,
      reference: lastProductArrayElement.reference + 1
    };
    this.state.products.push(newElement);

    this.setState({ products: this.state.products });
  }

  render() {

    return (
      <div style={divStyle}>
        <ToolkitProvider
          keyField="reference"
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
                  <Col xsOffset={9}>
                    <Button
                      onClick={this.handleShow}
                      style={divStyle} bsStyle='danger'>
                      Limpar Tabela
                    </Button>
                    <ExportCSVButton {...props.csvProps}>Baixar relatório</ExportCSVButton>
                  </Col>
                </Row>
              </div>
            )
          }
        </ToolkitProvider>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Atenção</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Você está prestes a apagar toda a tabela. Tem certeza que deseja deletar tudo?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.clearTable} bsStyle='danger'>Sim</Button>
            <Button onClick={this.handleClose} bsStyle='primary'>Não</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Dashboard
