import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import update from 'react-addons-update';
import {emptyProduct, divStyle, columns, ExportCSVButton} from '../constants/order_helper_table_structure';

export class Dashboard extends Component {

  constructor(props) {
    super(props);
    let appState = {
      products: [],
      show: false
    };

    //Select between cached state and new state
    if (localStorage.getItem("appState")) {
      appState = JSON.parse(localStorage.getItem("appState"));
    }
    else {
      for (let i = 0; i < 9; i++) {
        emptyProduct.id = 0 + i;
        appState.products.push({
          ...emptyProduct
        });
      }
    }

    this.state = { ...appState }

    this.addLIne = this.addLIne.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.afterSaveCell = this.afterSaveCell.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem('appState', JSON.stringify(this.state));
  }

  afterSaveCell(oldValue, newValue, row, column) {
    let quantity = parseInt(parseInt(row.rn, 10) + parseInt(row.p, 10) +
      parseInt(row.m, 10) + parseInt(row.g, 10)+ parseInt(row.gg, 10) +
      parseInt(row.one, 10) + parseInt(row.two, 10) + parseInt(row.three, 10) +
      parseInt(row.four, 10) + parseInt(row.six, 10) + parseInt(row.eight, 10) +
      parseInt(row.ten, 10) + parseInt(row.twelve, 10) + parseInt(row.fourteen, 10) +
      parseInt(row.sixteen, 10) + parseInt(row.eighteen, 10) + parseInt(row.twenty, 10), 10);
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
