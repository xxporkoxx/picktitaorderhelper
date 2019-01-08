const UploadFileParse = (fileContent) => {
    let numberOfLineEnd = ((fileContent.match(/~/g) || []).length);
    let numberOfSeparators = ((fileContent.match(/@/g) || []).length);

    let arrayOfProductsOnLines = fileContent.split("~");
    
    if (numberOfSeparators === 4 * numberOfLineEnd) {
        let arrayOfProducts = arrayOfProductsOnLines.map(lineProduct => {
            let splitedLineProducts = lineProduct.split("@");
            return {
                id: splitedLineProducts[0].replace(/[\n\r]+/g, ''),
                reference: splitedLineProducts[1],
                name: splitedLineProducts[2],
                stock: splitedLineProducts[3]
            }
        });
        return arrayOfProducts;
    }
    else {
        return null;
    }

}

export default UploadFileParse