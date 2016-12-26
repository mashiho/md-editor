import * as types from '../constants/action_types';

const initialState = {
  text: '',
  path: 'Undefined.md',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INPUT_TEXT:
      return Object.assign({}, state, {
        text: action.text,
      });
    case types.READ_FILE:
      console.log(action);
      return Object.assign({}, state, {
        text: action.data.text,
        path: action.data.path,
      });
    case types.SAVE_FILE:
      return Object.assign({}, state, {
        text: action.data.text,
        path: action.data.path,
      });
    case types.CLEAR_TEXT:
      return Object.assign({}, state, {
        text: action.data.text,
        path: action.data.path,
      });
    default:
      return state;
  }
};

export default rootReducer;
