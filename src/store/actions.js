import ActionTypes from './actionTypes';

export const setCurrentPaintingAction = (paintingInfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PAINTING_INFO,
      payload: paintingInfo,
    });
  };
};

export const setUserInfoAction = (userInfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER_INFO,
      payload: userInfo,
    });
  };
};
