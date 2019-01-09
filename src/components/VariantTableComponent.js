import { Table, Label, Row, Col } from 'react-bootstrap'
import React from 'react'

export const VariantTableComponent = (productArray) => {
    let mappedProductLayout = null

    if (productArray !== null) {
        mappedProductLayout = productArray.map(({ Product }) => {
            let arrayOfVariantReferences = []
            let arrayOfVariantNames = []
            let arrayOfVariantStocks = []

            Product.Variant.map(variant => {
                arrayOfVariantReferences.push(variant.reference)
                arrayOfVariantNames.push(`Variação de ${Product.name}`)
                arrayOfVariantStocks.push(variant.stock)
                return true;
            })

            return <tr key={Product.id}>
                <td><b>{Product.id}</b></td>
                <td>
                    <b>{Product.reference}</b>
                    {arrayOfVariantReferences.map((reference,i) => <p key={i}>{reference}</p>)}
                </td>
                <td>
                    <b>{Product.name}</b>
                    {arrayOfVariantNames.map((name,i) => <p key={i}>{name}</p>)}
                </td>
                <td>
                    <b>{Product.stock}</b>
                    {arrayOfVariantReferences.map((stock,i) => <p key={i}>{stock}</p>)}
                </td>
            </tr>;
        }
        );
    }

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
                {mappedProductLayout ? <tbody>{mappedProductLayout}</tbody> : null}
            </Table>
            <Row >
                <Col md={5} />
                <Col md={2}>
                    {mappedProductLayout ? null : <h3><Label bsStyle="warning">Nenhum Produto Listado</Label></h3>}
                </Col>
                <Col md={5} />
            </Row>
        </div>
    )
}