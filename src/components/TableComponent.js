import { Table, Label, Row, Col } from 'react-bootstrap'
import React from 'react'

export const TableComponent = (fileAccepted, content) => {
    return (
        <div>
            <Table
                striped bordered condensed hover
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Referência</th>
                        <th>Nome</th>
                        <th>Estoque</th>
                    </tr>
                </thead>
                {fileAccepted ? <tbody>{content}</tbody> : null}
            </Table>
            <Row >
                <Col md={5}/>
                <Col md={2}>
                    {fileAccepted ? null : <h3><Label bsStyle="warning">Nenhum Produto Listado</Label></h3>}
                </Col>
                <Col md={5}/>                
            </Row>
        </div>
    )
}