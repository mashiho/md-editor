import * as Actions from '../constants/action_types';

export const inputText = (text) => {
  return {
    type: Actions.INPUT_TEXT,
    text,
  };
};

export const readFile = (data) => {
  return {
    type: Actions.READ_FILE,
    text: data.text,
    path: data.path,
  }
}

export const saveFile = (data) => {
  return {
    type: Actions.SAVE_FILE,
    text: data.text,
    path: data.path,
  };
};

export const clearText = (data) => {
  return {
    type: Actions.CLEAR_TEXT,
    text: data.text,
    path: data.path,
  };
}
