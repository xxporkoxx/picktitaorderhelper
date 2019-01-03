import { trayApiReducer } from './trayApiReducer';
import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar'

export const rootReducer = combineReducers({
  trayApiState: trayApiReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer