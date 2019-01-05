import React from 'react';
import { tray_get_all_products } from '../actions';
import store from '../store/index'
import { hideLoading } from 'react-redux-loading-bar';

const ProductListDownload = (totalPages) => {
    totalPages = 10;
    let arrayOfPages = [];
    for (let i = 1; i <= totalPages; i++) {
        arrayOfPages[i - 1] = i;
    }

    store.dispatch(tray_get_all_products(arrayOfPages))
        .then((result) => {
            store.dispatch(hideLoading());
            console.log(result);
        }
    )

    return (true);
};

export default ProductListDownload