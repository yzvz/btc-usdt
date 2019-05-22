import { put, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as actionTypes from "../actionTypes";
import { MINITICKER_WS_URL } from "../../constants";

function initWebsocket() {
  return eventChannel((emitter: any) => {
    const ws: any = new WebSocket(MINITICKER_WS_URL);

    ws.onopen = (ev: Event) => {
      console.log('Opened @miniTicker WebSocket', ev);
      return emitter({ type: actionTypes.MINITICKER_WS_OPEN, ws })
    }

    ws.onerror = (ev: ErrorEvent) => {
      console.error('Error at @miniTicker WebSocket', ev);
      return emitter({ 
        type: actionTypes.MINITICKER_WS_ERROR, 
        error: new Error('Error establishing WebSocket connection')
      });
    }

    ws.onmessage = (ev: MessageEvent) => {
      let message = null;
  
      try {
        message = JSON.parse(ev.data);
      } catch (e) {
        console.error('Error at parsing @miniTicker WebSocket data');
      }

      if (message) {
        return emitter({ type: actionTypes.MINITICKER_WS_MESSAGE, message })
      }
    }

    return () => {
      ws.close();
      console.log('Closed @miniTicker WebSocket');
    }
  })
}

export function* miniTickerSocket() {
  yield put({ type: actionTypes.MINITICKER_WS_LOADING });
  const channel = yield call(initWebsocket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}