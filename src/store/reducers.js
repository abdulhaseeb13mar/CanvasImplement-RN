import {combineReducers} from 'redux';
import ActionTypes from './actionTypes';

let currentPainting = {};

let UserInfo = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  address: '',
};

const CurrentPaintingReducer = (state = currentPainting, action) => {
  switch (action.type) {
    case ActionTypes.SET_PAINTING_INFO:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

const UserInfoReducer = (state = UserInfo, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_INFO:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

export default combineReducers({CurrentPaintingReducer, UserInfoReducer});
