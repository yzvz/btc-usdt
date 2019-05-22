import * as actionTypes from '../actionTypes';

const initialState: {
  error: any,
  ws: any,
  loading: boolean,
  closePrice: string,
  highPrice: string,
  lowPrice: string,
  quoteVolume: string,
} = {
  error: null,
  ws: null,
  loading: false,
  closePrice: '',
  highPrice: '',
  lowPrice: '',
  quoteVolume: ''
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.MINITICKER_WS_LOADING:
      return { ...state, loading: true }
    case actionTypes.MINITICKER_WS_OPEN:
      return { ...state, ws: action.ws }
    case actionTypes.MINITICKER_WS_ERROR:
      return { ...state, error: action.error, loading: false };
    case actionTypes.MINITICKER_WS_MESSAGE:
      const { 
        c: closePrice, 
        h: highPrice, 
        l: lowPrice, 
        q: quoteVolume 
      } = action.message.data;

      return { 
        ...state, 
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
}

export default reducer;