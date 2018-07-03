import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';

const columns = [{
    dataField: 'id',
    text: 'Product ID'
  }, {
    dataField: 'name',
    text: 'Product Name'
  }, {
    dataField: 'price',
    text: 'Product Price'
  }];

const products = [{
    id: 1,
    name: "Product1",
    price: 120
}, {
    id: 2,
    name: "Product2",
    price: 80
}];

export class Dashboard extends Component {
    render() {
    return (
      <div>
        <p>Dashboard</p>
        <BootstrapTable keyField='id' data={ products }
         columns={ columns } filter={ filterFactory() } />
      </div>
    )
  }
}

export default Dashboard
