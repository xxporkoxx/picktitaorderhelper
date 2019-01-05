import {
    tray_get_all_products,
    actionResetLoading,
    tray_get_all_products_success,
    tray_get_all_products_failure
} from '../actions';
import store from '../store/index';

const ProductListDownload = (totalPages) => {
    totalPages = 10;
    let arrayOfPages = [];
    for (let i = 1; i <= totalPages; i++) {
        arrayOfPages[i - 1] = i;
    }

    store.dispatch(tray_get_all_products(arrayOfPages))
        .then((result) => {
            store.dispatch(tray_get_all_products_success(result));
            store.dispatch(actionResetLoading());
        })
        .catch((error) => {
            store.dispatch(tray_get_all_products_failure(error));
            store.dispatch(actionResetLoading());
        });

    return (true);
};

export default ProductListDownload