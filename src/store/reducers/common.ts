import { Reducer } from 'redux';
import * as actionTypes from '../actionTypes';

const initialState: {
  decimals: string
} = {
  decimals: '2'
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMON_SET_DECIMALS:
      return { ...state, decimals: action.decimals };
    default:
      break;
  }

  return state;
};

export default reducer;
