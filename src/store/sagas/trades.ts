import { put, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as actionTypes from "../actionTypes";
import { TRADES_WS_URL } from "../../constants";

function initWebsocket() {
  return eventChannel((emitter: any) => {
    const ws: any = new WebSocket(TRADES_WS_URL);

    ws.onopen = (ev: Event) => {
      console.log('Opened @trade WebSocket', ev);
      return emitter({ type: actionTypes.TRADES_WS_OPEN, ws });
    }

    ws.onerror = (ev: ErrorEvent) => {
      console.error('Error at @trade WebSocket', ev);
      return emitter({ 
        type: actionTypes.TRADES_WS_ERROR, 
        error: new Error('Error establishing WebSocket connection')
      });
    }

    ws.onmessage = (ev: MessageEvent) => {
      let message = null;
  
      try {
        message = JSON.parse(ev.data);
      } catch (e) {
        console.error('Error at parsing @trade WebSocket data');
      }

      if (message) {
        return emitter({ type: actionTypes.TRADES_WS_MESSAGE, message })
      }
    }

    return () => {
      ws.close();
      console.log('Closed @trade WebSocket');
    }
  })
}

export function* tradesSocket() {
  yield put({ type: actionTypes.TRADES_WS_LOADING });
  const channel = yield call(initWebsocket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}