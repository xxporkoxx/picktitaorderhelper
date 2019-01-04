import { Row, Col } from 'react-bootstrap';
import React, { Component } from 'react';
import Pagination from 'react-js-pagination';

export class ProductPagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: this.props.activePage
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
                <Col mdOffset={4} >
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={50}
                        pageRangeDisplayed={10}
                        onChange={(nextPage) => this.onClck(nextPage)}
                    />
                </Col>
            </Row>
        );
    }
}

export default ProductPagination;