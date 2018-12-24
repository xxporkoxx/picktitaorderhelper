import { TRAY_AUTH_POST, TRAY_AUTH_SUCCESS,TRAY_AUTH_FAILURE } from "../actions";

const initialState={
    auth: {}
};

export const trayApiReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case TRAY_AUTH_POST:
            return {
                ...state
            };
        case TRAY_AUTH_SUCCESS:
            return {
                ...state,
                auth: action.data
            };
        case TRAY_AUTH_FAILURE:
            return {
                ...state,
                auth: action.error
            };            
        default:
            return state
    }
};