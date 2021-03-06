import { Reducer } from 'redux';
import { MAX_BUFFERED_TRADES } from '../../constants';
import * as actionTypes from '../actionTypes';

const initialState: {
  trades: any[],
  ws: WebSocket | null,
  error: Error | null,
  loading: boolean,
  lastPrice: string,
  isBuyer: boolean
} = {
  trades: [],
  ws: null,
  error: null,
  loading: false,
  lastPrice: '',
  isBuyer: false
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRADES_WS_LOADING:
      return { ...state, loading: true };
    case actionTypes.TRADES_WS_OPEN:
      return { ...state, ws: action.ws };
    case actionTypes.TRADES_WS_ERROR:
      return { ...state, error: action.error, loading: false };
    case actionTypes.TRADES_WS_MESSAGE:
      const { trades } = state;

      return {
        ...state,
        trades: [action.message.data].concat(trades).slice(0, MAX_BUFFERED_TRADES),
        lastPrice: action.message.data.p,
        isBuyer: action.message.data.m,
        loading: false
      };
    default:
      break;
  }

  return state;
};

export default reducer;
