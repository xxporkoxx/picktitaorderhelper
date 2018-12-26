import {TRAY_CODE, TRAY_CONSUMER_KEY, TRAY_CONSUMER_SECRET_KEY, TRAY_API_URL } from '../api_keys';
import axios from 'axios';
import { Store } from '../store';

export const tray_auth = () => {
    let data = {
        code: TRAY_CODE,
        consumer_key: TRAY_CONSUMER_KEY,
        consumer_secret: TRAY_CONSUMER_SECRET_KEY
    };

    return (dispatch) => {
        return axios.post(`${TRAY_API_URL}/auth`,data);
    }
}

export const TRAY_AUTH_SUCCESS = 'TRAY_AUTH_SUCCESS';
export const tray_auth_success = (data) =>{
    return {
        type: TRAY_AUTH_SUCCESS,
        data
    }
}

export const TRAY_AUTH_FAILURE = 'TRAY_AUTH_FAILURE';
export const tray_auth_failure = (error) =>{
    return {
        type: TRAY_AUTH_FAILURE,
        error
    }
}

/*
    GET - Retrieve product informations 
    require access_token and product reference
*/
export const tray_get_product = (reference, all) => {
    let access_token = Store.getState().trayApiState.auth.access_token;    
    let url_get_all = `${TRAY_API_URL}/products/?access_token=${access_token}`;
    let url_get_single = `${url_get_all}&reference=${reference}`;
 
    return (dispatch) => {
        return axios.get(all? url_get_all:url_get_single);
    }
}

export const TRAY_GET_PRODUCT_SUCCESS = 'TRAY_GET_PRODUCT_SUCCESS';
export const tray_get_product_success = (data) =>{
    return {
        type: TRAY_GET_PRODUCT_SUCCESS,
        data
    }
}

export const TRAY_GET_PRODUCT_FAILURE = 'TRAY_GET_PRODUCT_FAILURE';
export const tray_get_product_failure = (error) =>{
    return {
        type: TRAY_GET_PRODUCT_FAILURE,
        error
    }
}

/*PUT - Refreshing product 
    require access_token and id
*/
export const tray_refresh_product = (reference) => {
    let access_token = Store.getState().trayApiState.auth.access_token;    

    return (dispatch) => {
        return axios.get(`${TRAY_API_URL}/products/?access_token=${access_token}&reference=${reference}`)
        .then(response => {
            dispatch(tray_refresh_product_success(response.data))
        })
        .catch(error => {
            dispatch (tray_refresh_product_failure(error));
        });
    }
}

export const TRAY_REFRESH_PRODUCT_SUCCESS = 'TRAY_REFRESH_PRODUCT_SUCCESS';
export const tray_refresh_product_success = (data) =>{
    return {
        type: TRAY_REFRESH_PRODUCT_SUCCESS,
        data
    }
}

export const TRAY_REFRESH_PRODUCT_FAILURE = 'TRAY_REFRESH_PRODUCT_FAILURE';
export const tray_refresh_product_failure = (error) =>{
    return {
        type: TRAY_REFRESH_PRODUCT_FAILURE,
        error
    }
}