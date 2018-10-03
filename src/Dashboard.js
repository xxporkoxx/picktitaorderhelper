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

const emptyProduct = {
  reference: 1000,
  p: 0,
  m: 0,
  g: 0,
  one: 0,
  two: 0,
  three: 0,
  four: 0,
  six: 0,
  eight: 0,
  ten: 0,
  twelve: 0,
  fourteen: 0,
  price: 0,
  quantity: 0,
  total: 0,
  color: 0
};

export class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = { products: [] };
    for (let i = 0; i < 9; i++) {
      emptyProduct.reference = 1000 + i;
      this.state.products.push({
        ...emptyProduct
      });
    }
    this.state.show = false;
    this.addLIne = this.addLIne.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  clearTable() {
    let arrayOfProducts = [];
    for (let i = 0; i < this.state.products.length; i++) {
      emptyProduct.reference = 1000 + i;
      arrayOfProducts.push({
        ...emptyProduct
      });
    }
    this.setState({ products: arrayOfProducts });
    this.setState({ show: false });
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
