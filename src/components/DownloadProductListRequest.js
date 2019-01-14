import {
    tray_get_all_products,
    actionResetLoading,
    tray_get_all_products_success,
    tray_get_all_products_failure
} from '../actions';
import store from '../store/index';

const DownloadProductListRequest = (totalPages) => {
    totalPages = 1;
    let arrayOfPages = [];
    for (let i = 1; i <= totalPages; i++) {
        arrayOfPages[i - 1] = i;
    }

    return( store.dispatch(tray_get_all_products(arrayOfPages))
        .then((result) => {

            let allProducts =
                [].concat.apply([], result.map((request) => {
                    return request.data.Products
                })
            );

            store.dispatch(tray_get_all_products_success(allProducts));
            store.dispatch(actionResetLoading());

            return allProducts;
        })
        .catch((error) => {
            store.dispatch(tray_get_all_products_failure(error));
            store.dispatch(actionResetLoading());
            return error;
        })
    )
};

export default DownloadProductListRequest