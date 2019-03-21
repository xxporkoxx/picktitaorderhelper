// import store from '../store';
// import {actionShowLoading, actionHideLoading, actionResetLoading } from './index'

export const SAVE_ACCEPTED_FILES = 'SAVE_ACCEPTED_FILES';
export const save_accepted_files = (data) => {
    return {
        type: SAVE_ACCEPTED_FILES,
        data
    }
}