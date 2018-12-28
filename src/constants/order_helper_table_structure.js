import { CSVExport } from 'react-bootstrap-table2-toolkit';

export const { ExportCSVButton } = CSVExport;

export const columns = [{
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
  dataField: 'rn',
  text: 'RN'
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
  dataField: 'gg',
  text: 'GG'
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
  dataField: 'sixteen',
  text: '16'
}, {
  dataField: 'eighteen',
  text: '18'
}, {
  dataField: 'twenty',
  text: '20'
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
  formatter: currencyFormatter,
  style: {
    backgroundColor: '#efefef',
    fontWeight: 'bold'
  }
}];

function currencyFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    parseFloat(cell).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  );
}

export const divStyle = {
  margin: '10px'
};

export const emptyProduct = {
  id: 0,
  reference: 0,
  rn: 0,
  p: 0,
  m: 0,
  g: 0,
  gg:0,
  one: 0,
  two: 0,
  three: 0,
  four: 0,
  six: 0,
  eight: 0,
  ten: 0,
  twelve: 0,
  fourteen: 0,
  sixteen: 0,
  eighteen: 0,
  twenty: 0,
  price: 0,
  quantity: 0,
  total: 0,
  color: "---"
};