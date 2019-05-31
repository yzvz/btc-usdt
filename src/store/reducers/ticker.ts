import { Reducer } from 'redux';
import * as actionTypes from '../actionTypes';

const initialState: {
  error: Error | null,
  ws: WebSocket | null,
  loading: boolean,
  priceChange: string,
  priceChangePercent: string,
  closePrice: string,
  highPrice: string,
  lowPrice: string,
  quoteVolume: string
} = {
  error: null,
  ws: null,
  loading: false,
  priceChange: '',
  priceChangePercent: '',
  closePrice: '',
  highPrice: '',
  lowPrice: '',
  quoteVolume: ''
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TICKER_WS_LOADING:
      return { ...state, loading: true };
    case actionTypes.TICKER_WS_OPEN:
      return { ...state, ws: action.ws };
    case actionTypes.TICKER_WS_ERROR:
      return { ...state, error: action.error, loading: false };
    case actionTypes.TICKER_WS_MESSAGE:
      const {
        p: priceChange,
        P: priceChangePercent,
        c: closePrice,
        h: highPrice,
        l: lowPrice,
        q: quoteVolume
      } = action.message.data;

      return {
        ...state,
        priceChange,
        priceChangePercent,
        closePrice,
        highPrice,
        lowPrice,
        quoteVolume,
        loading: false
      };
    default:
      break;
  }

  return state;
};

export default reducer;
