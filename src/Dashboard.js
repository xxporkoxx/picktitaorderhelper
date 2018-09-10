import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

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

const products = [{
  reference: 1,
  name: "Product1",
  price: 120
}, {
  reference: 2,
  name: "Product2",
  price: 80
}];

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <ToolkitProvider
          keyField="id"
          data={products}
          columns={columns}
          exportCSV
        >
          {
            props => (
              <div>
                <ExportCSVButton {...props.csvProps}>Baixar relatório</ExportCSVButton>
                <hr />
                <BootstrapTable 
                  {...props.baseProps}
                  filter={filterFactory()}
                  cellEdit={cellEditFactory({ mode: 'click' })}
                />
              </div>
            )
          }
        </ToolkitProvider>
      </div>
    )
  }
}

export default Dashboard
