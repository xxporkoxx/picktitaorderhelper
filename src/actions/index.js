import {TRAY_CODE, TRAY_CONSUMER_KEY, TRAY_CONSUMER_SECRET_KEY, TRAY_API_URL } from '../api_keys';
import axios from 'axios';

export const TRAY_AUTH_POST = 'TRAY_AUTH_POST';
export const tray_auth = () => {
    let data = {
        code: TRAY_CODE,
        consumer_key: TRAY_CONSUMER_KEY,
        consumer_secret: TRAY_CONSUMER_SECRET_KEY
    };

    return (dispatch) => {
        return axios.post(`${TRAY_API_URL}/auth`,data)
        .then(response => {
            dispatch(tray_auth_success(response.data))
        })
        .catch(error => {
            dispatch (tray_auth_failure(error));
        });
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