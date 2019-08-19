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

        this.refreshProductList = this.refreshProductList.bind(this);
        this.onSelectPage = this.onSelectPage.bind(this);
        this.fileDownload = this.fileDownload.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth !== this.props.auth) {
            this.refreshProductList(1);
        }
    }

    refreshProductList(page) {
        this.props.tray_get_product(null, page)
            .then(response => {
                let { data } = response;
                this.props.tray_get_product_success(data);
                this.props.actionResetLoading();
            })
            .catch(error => {
                this.props.tray_get_product_failure(error);
                this.props.actionResetLoading();
                alert(error);
            });
    }

    fileDownload() {
        let { limit, total } = this.props.products.paging;
        let totalPages = Math.round(total / limit);
        let chunk = 5
        let arrayOfChunkPages = [];

        let arrayOfPages = [];
        for (let i = 1; i <= totalPages; i++) {
            arrayOfPages[i - 1] = i;
        }

        let pagecounter = 0;
        for (let i = 0, j = arrayOfPages.length; i < j; i += chunk, pagecounter++) {
            arrayOfChunkPages[pagecounter] = arrayOfPages.slice(i, i + chunk);
        }

        DownloadProductListRequest(arrayOfChunkPages[0])
            .then((result) => {
                DownloadFileStructuring(result);
                DownloadProductListRequest(arrayOfChunkPages[1])
                    .then((result) => {
                        DownloadFileStructuring(result);
                        DownloadProductListRequest(arrayOfChunkPages[2])
                            .then((result) => {
                                DownloadFileStructuring(result);
                                DownloadProductListRequest(arrayOfChunkPages[3])
                                    .then((result) => {
                                        DownloadFileStructuring(result);
                                    })
                            })
                    })
            })
    }

    onSelectPage(newSelectedPage) {
        this.refreshProductList(newSelectedPage);
    }

    render() {
        let productArray = this.props.products.Products
        let { page, limit, total } = this.props.products.paging;

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
    products: state.trayApiState.products
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...TrayIntegrationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TrayProductListing);