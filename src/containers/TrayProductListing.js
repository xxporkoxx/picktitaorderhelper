import { Button, Table, Row, Col } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrayIntegrationActions from '../actions';
import { ProductPagination } from '../components/ProductPagination';
import ProductListDownload from '../components/ProductListDownload'
import DownloadFileStructuring from '../components/DownloadFileStructuring';

export class TrayProductListing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trayApiState: {
                products: {
                    paging: {
                        page: 0,
                        limit: 0,
                        maxLimit: 0,
                        offset: 0,
                        total: 0
                    }
                }
            }
        };

        this.refreshProductList = this.refreshProductList.bind(this);
        this.onSelectPage = this.onSelectPage.bind(this);
        this.fileDownload = this.fileDownload.bind(this);
    }

    componentDidMount() {
        this.props.tray_auth()
            .then(response => {
                this.props.tray_auth_success(response.data)
                this.refreshProductList(1);
            })
            .catch(error => {
                this.props.tray_auth_failure(error);
                alert(error);
            });
    }

    refreshProductList(page) {
        this.props.tray_get_product(null, page)
            .then(response => {
                let { data } = response;
                this.props.tray_get_product_success(data);
                this.props.actionHideLoading();
                this.setState({
                    trayApiState: {
                        products: {
                            paging: {
                                page: data.paging.page,
                                limit: data.paging.limit,
                                offset: data.paging.offset,
                                total: data.paging.total
                            }
                        }
                    }
                })
            })
            .catch(error => {
                this.props.tray_get_product_failure(error);
                this.props.actionHideLoading();
                alert(error);
            });
    }

    fileDownload() {
        let { limit, total } = this.state.trayApiState.products.paging;
        let totalPages = Math.round(total / limit);
        ProductListDownload(totalPages)
            .then((result) => {
                DownloadFileStructuring(result);
            })
            .catch((error) => {
                alert(error);
            })
    }

    onSelectPage(newSelectedPage) {
        this.refreshProductList(newSelectedPage);
    }

    render() {
        let productArray = this.props.products ? this.props.products.Products : null;
        let mappedProductArray = <tr />;
        let { page, limit, total } = this.state.trayApiState.products.paging;

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

        let paginationComponent = (total === 0) ? null :
            <ProductPagination
                activePage={page}
                onSelectPage={this.onSelectPage}
                limit={limit}
                total={total}
            />;

        return (
            <div style={{ paddingTop: '10px' }}>
                <Row>
                    <Col>
                        <Button bsStyle="primary" onClick={() => this.fileDownload()}>
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
                {paginationComponent}
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