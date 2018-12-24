import { trayApiReducer } from './trayApiReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  trayApiState: trayApiReducer
});