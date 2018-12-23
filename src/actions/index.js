import {TRAY_CODE, TRAY_CONSUMER_KEY, TRAY_CONSUMER_SECRET_KEY } from '../api_keys';

export const CLICK_UPDATE_VALUE = 'CLICK_UPDATE_VALUE';
export const clickButton = value => ({
    type: CLICK_UPDATE_VALUE,
    newValue: value
})

export const TRAY_AUTH_POST = 'TRAY_AUTH_POST';
export const tray_auth = () =>({
    type: TRAY_AUTH_POST
})

export const TRAY_AUTH_SUCCESS = 'TRAY_AUTH_SUCCESS';
export const tray_auth_success = () =>({
    type: TRAY_AUTH_SUCCESS
})


export const TRAY_AUTH_FAILURE = 'TRAY_AUTH_FAILURE';
export const tray_auth_failure = () =>({
    type: TRAY_AUTH_FAILURE
})