import {
    SAVE_ACCEPTED_FILES
} from '../actions/PhotoManipulationActions'

const initialState = {
    photos: []
}

export const photoManipulationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ACCEPTED_FILES:
            return {
                ...state,
                photos: action.data
            }
        default:
            return state
    }
}