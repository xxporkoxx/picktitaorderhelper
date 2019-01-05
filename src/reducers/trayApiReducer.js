import {
    TRAY_AUTH_SUCCESS,
    TRAY_AUTH_FAILURE,
    TRAY_GET_PRODUCT_SUCCESS,
    TRAY_GET_PRODUCT_FAILURE,
    TRAY_REFRESH_PRODUCT_SUCCESS,
    TRAY_REFRESH_PRODUCT_FAILURE,
    TRAY_GET_ALL_PRODUCTS_SUCCESS,
    TRAY_GET_ALL_PRODUCTS_FAILURE
} from "../actions";

const initialState = {
    auth: {}
};

export const trayApiReducer = (state = initialState, action) => {

    switch (action.type) {
        case TRAY_AUTH_SUCCESS:
            return {
                ...state,
                auth: action.data
            };
        case TRAY_AUTH_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case TRAY_GET_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.data
            };
        case TRAY_GET_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case TRAY_REFRESH_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.data
            };
        case TRAY_REFRESH_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case TRAY_GET_ALL_PRODUCTS_SUCCESS:
        return {
            ...state,
            allProducts: action.data
        };
        case TRAY_GET_ALL_PRODUCTS_FAILURE:
        return {
            ...state,
            error: action.error
        };  
        default:
            return state
    }
};