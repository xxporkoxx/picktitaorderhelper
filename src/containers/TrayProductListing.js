import { Button, Table, Row, Col, Pagination } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrayIntegrationActions from '../actions';

export class TrayProductListing extends Component {

    constructor(props) {
        super(props);

        this.state = { activePage: 1,
            trayApiState: {
                products: {},
            } 
        };

        this.refreshProductList = this.refreshProductList.bind(this);
        this.fileDownload = this.fileDownload.bind(this);
    }

    componentDidMount() {
        this.props.tray_auth()
            .then(response => {
                this.props.tray_auth_success(response.data)
                this.refreshProductList();
            })
            .catch(error => {
                this.props.tray_auth_failure(error);
            });
    }

    refreshProductList() {
        this.props.tray_get_product(null,4)
            .then(response => {
                this.props.tray_get_product_success(response.data);
                this.props.actionHideLoading();                                                
            })
            .catch(error => {
                this.props.tray_get_product_failure(error);
                this.props.actionHideLoading();                                                                
                alert(error);
            });
    }

    fileDownload() {

    }

    render() {
        let productArray = this.props.products ? this.props.products.Products : null;
        let mappedProductArray = <tr />;

        if (productArray !== null) {
            mappedProductArray = productArray.map(
                ({ Product }) => {
                    return (
                        <tr key={Product.id}>
                            <td>{Product.id}</td>
                            <td>{Product.reference}</td>
                            <td>{Product.name}</td>
                            <td>{Product.stock}</td>
                        </tr>
                    )
                }
            );
        }

        return (
            <div style={{ paddingTop: '10px' }}>
                <Row>
                    <Col md={4} sm={4} xs={6}>
                        <Button onClick={() => this.refreshProductList()}>
                            Recarregar Relatório de Produtos
                        </Button>
                    </Col>
                    <Col md={4} sm={4} xs={6}>
                        <Button onClick={() => this.fileDownload()}>
                            Baixar Relatório de Produtos
                        </Button>
                    </Col>

                </Row>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Referência</th>
                            <th>Nome</th>
                            <th>Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mappedProductArray}
                    </tbody>
                </Table>
                <Row>
                    <Col mdOffset={4} >
                        <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />

                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Item>{11}</Pagination.Item>
                            <Pagination.Item active>{12}</Pagination.Item>
                            <Pagination.Item>{13}</Pagination.Item>
                            <Pagination.Item disabled>{14}</Pagination.Item>

                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>;
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.trayApiState.auth,
    products: state.trayApiState.products
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...TrayIntegrationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TrayProductListing);