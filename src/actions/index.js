import { TRAY_CODE, TRAY_CONSUMER_KEY, TRAY_CONSUMER_SECRET_KEY, TRAY_API_URL } from '../constants/api_keys';
import axios from 'axios';
import store from '../store';
import { showLoading, hideLoading, resetLoading } from 'react-redux-loading-bar'

export const actionShowLoading = () => { return (dispatch) => dispatch(showLoading()) }
export const actionHideLoading = () => { return (dispatch) => dispatch(hideLoading()) }
export const actionResetLoading = () => { return (dispatch) => dispatch(resetLoading()) }

export const tray_auth = () => {
    let data = {
        code: TRAY_CODE,
        consumer_key: TRAY_CONSUMER_KEY,
        consumer_secret: TRAY_CONSUMER_SECRET_KEY
    };

    return (dispatch) => {
        return axios.post(`${TRAY_API_URL}/auth`, data);
    }
}

export const TRAY_AUTH_SUCCESS = 'TRAY_AUTH_SUCCESS';
export const tray_auth_success = (data) => {
    return {
        type: TRAY_AUTH_SUCCESS,
        data
    }
}

export const TRAY_AUTH_FAILURE = 'TRAY_AUTH_FAILURE';
export const tray_auth_failure = (error) => {
    return {
        type: TRAY_AUTH_FAILURE,
        error
    }
}

/*
    GET - Retrieve product informations 
    require access_token and product reference
*/
const limit = 50; //Retrieve 50 products per page
export const tray_get_product = (reference, pageNumber) => {
    let access_token = store.getState().trayApiState.auth.access_token;
    let url = `${TRAY_API_URL}/products/?access_token=${access_token}`;

    let url_get_page = Number.isInteger(pageNumber) ?
        `${url}&page=${pageNumber}&limit=${limit}` : null;
    let url_get_single = Number.isInteger(reference) ? `${url}&reference=${reference}` : null;

    url = (url_get_page !== null) ? url_get_page : url_get_single;

    return (dispatch) => {
        dispatch(showLoading())
        return axios.get(url)
            .then((productResponse) => {
                let productsArray = productResponse.data.Products;
                let variantPromiseArray = productsArray.map(({ Product } = productsArray) => {
                    let variantArray = Product.Variant

                    if (variantArray.length > 0) {
                        return Promise.all(
                            variantArray.map(variant => {
                                return dispatch(tray_get_product_variant(variant.id))
                            })
                        );
                    }
                    return null;
                })

                variantPromiseArray.map((promise, i) => {
                    return promise != null ?
                        promise.then(solvedVariantPromiseArray => {
                            productResponse.data.Products[i].Product.Variant = solvedVariantPromiseArray
                            /*let arrayofVariants = solvedVariantPromiseArray.map((solvedVariant, i) => {
                                return solvedVariant.then( variantResponse => solvedVariant)
                            })
                            console.log(arrayofVariants)*/
                        }) : null
                })

                console.log(productResponse)


                console.log(variantPromiseArray)
                return variantPromiseArray
            })
            .catch((error) => {
                return error
            });
    }
}

export const TRAY_GET_PRODUCT_SUCCESS = 'TRAY_GET_PRODUCT_SUCCESS';
export const tray_get_product_success = (data) => {
    return {
        type: TRAY_GET_PRODUCT_SUCCESS,
        data
    }
}

export const TRAY_GET_PRODUCT_FAILURE = 'TRAY_GET_PRODUCT_FAILURE';
export const tray_get_product_failure = (error) => {
    return {
        type: TRAY_GET_PRODUCT_FAILURE,
        error
    }
}

export const tray_get_product_variant = (variantId) => {
    let access_token = store.getState().trayApiState.auth.access_token;
    let url = `${TRAY_API_URL}/products/variants/?access_token=${access_token}&id=${variantId}`;

    return (dispatch) => {
        dispatch(showLoading())
        return axios.get(url);
    }
}

/*PUT - Refreshing product 
    require access_token and product id
*/
export const tray_refresh_product = (reference) => {
    let access_token = store.getState().trayApiState.auth.access_token;

    return (dispatch) => {
        dispatch(showLoading())
        return axios.get(`${TRAY_API_URL}/products/?access_token=${access_token}&reference=${reference}`)
            .then(response => {
                dispatch(tray_refresh_product_success(response.data))
            })
            .catch(error => {
                dispatch(tray_refresh_product_failure(error));
            });
    }
}

export const TRAY_REFRESH_PRODUCT_SUCCESS = 'TRAY_REFRESH_PRODUCT_SUCCESS';
export const tray_refresh_product_success = (data) => {
    return {
        type: TRAY_REFRESH_PRODUCT_SUCCESS,
        data
    }
}

export const TRAY_REFRESH_PRODUCT_FAILURE = 'TRAY_REFRESH_PRODUCT_FAILURE';
export const tray_refresh_product_failure = (error) => {
    return {
        type: TRAY_REFRESH_PRODUCT_FAILURE,
        error
    }
}

/*GET
 TRAY RETIREVE ALL PRODUCTS AVAIABLE
*/
export const tray_get_all_products = (arrayOfPagesNumbers) => {
    return dispatch => Promise.all(
        arrayOfPagesNumbers.map((currentPage) => {
            return dispatch(tray_get_product(null, currentPage))
        })
    );
}

export const TRAY_GET_ALL_PRODUCTS_SUCCESS = 'TRAY_GET_ALL_PRODUCTS_SUCCESS';
export const tray_get_all_products_success = (data) => {
    return {
        type: TRAY_GET_ALL_PRODUCTS_SUCCESS,
        data
    }
}

export const TRAY_GET_ALL_PRODUCTS_FAILURE = 'TRAY_GET_ALL_PRODUCTS_FAILURE';
export const tray_get_all_products_failure = (data) => {
    return {
        type: TRAY_GET_ALL_PRODUCTS_FAILURE,
        data
    }
}

// Saving All the uploaded products iside the store
export const SAVE_UPLOADED_PRODUCTS = 'SAVE_UPLOADED_PRODUCTS';
export const save_uploaded_products = (data) => {
    return {
        type: SAVE_UPLOADED_PRODUCTS,
        data
    }
}