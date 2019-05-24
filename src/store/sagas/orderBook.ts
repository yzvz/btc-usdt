import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { ORDERBOOK_WS_URL } from '../../constants';
import * as utils from '../../utils';
import * as actionTypes from '../actionTypes';

function initWebsocket() {
  return eventChannel((emitter: any) => {
    const ws: WebSocket = new WebSocket(ORDERBOOK_WS_URL);

    ws.onopen = (ev: Event) => {
      utils.logger.log('Opened @orderBook WebSocket', ev);
      return emitter({ type: actionTypes.ORDERBOOK_WS_OPEN, ws });
    };

    ws.addEventListener('error', (ev: any) => {
      utils.logger.error('Error at @orderBook WebSocket', ev);
      return emitter({
        type: actionTypes.ORDERBOOK_WS_ERROR,
        error: new Error('Error establishing WebSocket connection')
      });
    });

    ws.onmessage = (ev: MessageEvent) => {
      let message = null;

      try {
        message = JSON.parse(ev.data);
      } catch (e) {
        utils.logger.error('Error at parsing @orderBook WebSocket data');
      }

      if (message) {
        return emitter({ type: actionTypes.ORDERBOOK_WS_MESSAGE, message });
      }
    };

    return () => {
      ws.close();
      utils.logger.log('Closed @orderBook WebSocket');
    };
  });
}

export function* orderBookSocket() {
  yield put({ type: actionTypes.ORDERBOOK_WS_LOADING });
  const channel = yield call(initWebsocket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
