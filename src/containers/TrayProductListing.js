import { Button, Row, Col } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrayIntegrationActions from '../actions';
import { ProductPagination } from '../components/ProductPagination';
import DownloadProductListRequest from '../components/DownloadProductListRequest'
import DownloadFileStructuring from '../components/DownloadFileStructuring';
import { VariantTableComponent } from '../components/VariantTableComponent';

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

                this.setState({
                    trayApiState: {
                        products: {
                            Products: data.Products,
                            paging: {
                                page: data.paging.page,
                                limit: data.paging.limit,
                                offset: data.paging.offset,
                                total: data.paging.total
                            }
                        }
                    }
                })
                this.props.actionResetLoading();
            })
            .catch(error => {
                this.props.tray_get_product_failure(error);
                this.props.actionResetLoading();
                alert(error);
            });
    }

    fileDownload() {
        let { limit, total } = this.state.trayApiState.products.paging;
        let totalPages = Math.round(total / limit);
        DownloadProductListRequest(totalPages)
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
        let productArray =
            this.state.trayApiState.products.Products ?
                this.state.trayApiState.products.Products : null;
        let { page, limit, total } = this.state.trayApiState.products.paging;

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
                        <Button
                            bsStyle="primary"
                            style={{ margin: '10px', marginLeft: '20px' }}
                            onClick={() => this.fileDownload()}>
                            Baixar Relatório de Produtos
                        </Button>
                    </Col>
                </Row>
                {VariantTableComponent(productArray)}
                {paginationComponent}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.trayApiState.auth,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...TrayIntegrationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TrayProductListing);