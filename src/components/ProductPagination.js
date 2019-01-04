import { Row, Col } from 'react-bootstrap';
import React, { Component } from 'react';
import Pagination from 'react-js-pagination';

export class ProductPagination extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            activePage: this.props.activePage,
            itemsCountPerPage: this.props.limit,
            totalItemsCount: this.props.total
        };
        this.onClck = this.onClck.bind(this);
    }

    onClck(selectedPage) {
        this.setState({
            activePage: selectedPage
        })
        this.props.onSelectPage(selectedPage);
    }

    render() {
        return (
            <Row>
                <Col mdOffset={2} >
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={20}
                        onChange={(nextPage) => this.onClck(nextPage)}
                    />
                </Col>
            </Row>
        );
    }
}

export default ProductPagination;