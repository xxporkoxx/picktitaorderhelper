const DownloadFileStructuring = (arrayOfProducts) => {
    let tempLink = document.createElement('a');
    let date = new Date();
    let fileName =
        `RelatorioProdutosDown.${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}.${date.getHours()}.${date.getMinutes()}.txt`

    //Formatting info ID|REFERENCE|NAME|STOCK and changing the separator by a new line: \r\n
    let parsedText = arrayOfProducts.map((item) => {
        let product = item.Product;
        let variantArray = product.Variant;
        let productPlottedString =
            `${product.id}@${product.reference}@${product.name}@${product.stock}@~`;

        let variantPlotedString = variantArray.map(variant => {
            return `${variant.id}@${variant.reference}@${product.name}@${variant.stock}@~`
        }).join("\r\n");

        return variantPlotedString ? productPlottedString + "\r\n" + variantPlotedString : productPlottedString;
    }).join("\r\n");

    tempLink.href = window.URL.createObjectURL(new Blob([parsedText], { type: 'text/plain' }));
    tempLink.setAttribute('download', fileName);
    tempLink.click();
}

export default DownloadFileStructuring