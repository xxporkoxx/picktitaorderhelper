import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import update from 'react-addons-update';

const { ExportCSVButton } = CSVExport;

const columns = [{
  dataField: 'id',
  text: '#',
  editable: false,
  style: {
    backgroundColor: '#efefef',
    fontWeight: 'bold'
  }
}, {
  dataField: 'reference',
  text: 'REF'
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
  dataField: 'quantity',
  text: 'Qnt',
  editable: false,
  style: {
    backgroundColor: '#efefef',
    fontWeight: 'bold'
  }
}, {
  dataField: 'price',
  text: 'Preço',
  formatter: currencyFormatter
}, {
  dataField: 'total',
  text: 'Total',
  editable: false,
  style: {
    backgroundColor: '#efefef',
    fontWeight: 'bold'
  },
  formatter: currencyFormatter
}];

function currencyFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    parseFloat(cell).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  );
}

const divStyle = {
  margin: '10px'
};

const emptyProduct = {
  id: 0,
  reference: 0,
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
  color: "---"
};

export class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = { products: [] };
    for (let i = 0; i < 9; i++) {
      emptyProduct.id = 0 + i;
      this.state.products.push({
        ...emptyProduct
      });
    }
    this.state.show = false;
    this.addLIne = this.addLIne.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.afterSaveCell = this.afterSaveCell.bind(this);
  }

  afterSaveCell(oldValue, newValue, row, column) {
    let quantity = parseInt(parseInt(row.p, 10) + parseInt(row.m, 10) +
      parseInt(row.g, 10) + parseInt(row.one, 10) + parseInt(row.two, 10) +
      parseInt(row.three, 10) + parseInt(row.four, 10) + parseInt(row.six, 10) +
      parseInt(row.eight, 10) + parseInt(row.ten, 10) + parseInt(row.twelve, 10) +
      parseInt(row.fourteen, 10), 10);
    let total = parseInt(quantity, 10) * parseFloat(row.price, 10);
    let product = this.state.products[row.id];

    product.total = total;
    product.quantity = quantity;

    this.setState(prevState => ({
      products: update(prevState.products, { [row.id]: { $set: product } })
    }));
  }

  clearTable() {
    let arrayOfProducts = [];
    for (let i = 0; i < this.state.products.length; i++) {
      emptyProduct.id = 0 + i;
      arrayOfProducts.push({
        ...emptyProduct
      });
    }
    this.setState({ products: arrayOfProducts });
    this.setState({ show: false });
  }

  handleClose() { this.setState({ show: false }) }
  handleShow() { this.setState({ show: true }) }

  addLIne() {
    let lastRowIndex = this.state.products.length - 1;
    let lastProductArrayElement = this.state.products[lastRowIndex];

    let newElement = {
      ...lastProductArrayElement,
      id: lastProductArrayElement.id + 1
    };
    this.state.products.push(newElement);

    this.setState({ products: this.state.products });
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
                  cellEdit={cellEditFactory({
                    mode: 'click',
                    afterSaveCell: (oldValue, newValue, row, column) => { this.afterSaveCell(oldValue, newValue, row, column) }
                  })}
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
