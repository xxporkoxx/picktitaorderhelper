import { trayApiReducer } from './trayApiReducer';
import { photoManipulationReducer } from './photoManipulationReducer'
import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar'

export const rootReducer = combineReducers({
  trayApiState: trayApiReducer,
  loadingBar: loadingBarReducer,
  photoManipulation: photoManipulationReducer
});

export default rootReducer