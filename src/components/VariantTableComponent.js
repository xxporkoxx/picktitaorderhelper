import { Table, Label, Row, Col } from 'react-bootstrap'
import React from 'react'

export const VariantTableComponent = (productArray, refreshedProductsStatus) => {
    let mappedProductLayout = null

    if (productArray !== null) {

        mappedProductLayout = productArray.map(({ Product }, i) => {
            let arrayOfVariantIds = []
            let arrayOfVariantReferences = []
            let arrayOfVariantNames = []
            let arrayOfVariantStocks = []
            let arrayOfVariantStatus = []

            if (refreshedProductsStatus) {
                Product = Product.Variant.length > 0 ?
                    { ...Product, status: refreshedProductsStatus[i][0].statusText } :
                    { ...Product, status: refreshedProductsStatus[i].statusText }
            }

            Product.Variant.map((variant, j) => {
                arrayOfVariantIds.push(variant.id)
                arrayOfVariantReferences.push(variant.reference)
                arrayOfVariantNames.push(`Variação de ${Product.name}`)
                arrayOfVariantStocks.push(variant.stock)
                refreshedProductsStatus ?
                    arrayOfVariantStatus.push(refreshedProductsStatus[i][j + 1].statusText):null
                return true;
            })

            return <tr key={Product.id + i}>
                <td>
                    <b>{Product.id}</b>
                    {arrayOfVariantIds.map((id, i) => <p key={i}>{id}</p>)}
                </td>
                <td>
                    <b>{Product.reference}</b>
                    {arrayOfVariantReferences.map((reference, i) => <p key={i}>{reference}</p>)}
                </td>
                <td>
                    <b>{Product.name}</b>
                    {arrayOfVariantNames.map((name, i) => <p key={i}>{name}</p>)}
                </td>
                <td>
                    <b>{Product.stock}</b>
                    {arrayOfVariantStocks.map((stock, i) => <p key={i}>{stock}</p>)}
                </td>
                {
                    refreshedProductsStatus ?
                        <td>
                            <b>{Product.status}</b>
                            {arrayOfVariantStatus.map((object, i) => <p key={i}>{object}</p>)}
                        </td>
                        :
                        <td>
                            <b>---</b>
                            {arrayOfVariantStocks.map((stock, i) => <p key={i}>---</p>)}
                        </td>
                }
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
                        <th>Status</th>
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