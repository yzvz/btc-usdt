import { MAX_BUFFERED_ASKS, MAX_BUFFERED_BIDS } from '../../constants';
import * as actionTypes from '../actionTypes';

const initialState: {
  asks: any,
  bids: any
  error: any,
  loading: boolean,
  ws: any,
  last_u: any
} = {
  asks: [],
  bids: [],
  error: null,
  loading: false,
  ws: null,
  last_u: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.ORDERBOOK_WS_LOADING:
      return { ...state, loading: true };
    case actionTypes.ORDERBOOK_WS_OPEN:
      return { ...state, ws: action.ws };
    case actionTypes.ORDERBOOK_WS_ERROR:
      return { ...state, error: action.error, loading: false };
    case actionTypes.ORDERBOOK_WS_MESSAGE:
      const { asks, bids, last_u } = state;
      const { data } = action.message;
      let { a, b } = data;
      const { u, U } = data;

      // While listening to the stream, each new event's U should be equal to the previous event's u+1
      if (U === last_u + 1 || last_u === null) {
        a = a.filter((entry: any) => parseFloat(entry[1]) !== 0); // If the quantity is 0, remove the price level
        b = b.filter((entry: any) => parseFloat(entry[1]) !== 0); // If the quantity is 0, remove the price level

        return {
          ...state,
          asks: a.concat(asks).slice(0, MAX_BUFFERED_ASKS),
          bids: b.concat(bids).slice(0, MAX_BUFFERED_BIDS),
          last_u: u,
          loading: false
        };
      } else {
        return state;
      }
    default:
      break;
  }

  return state;
};

export default reducer;
