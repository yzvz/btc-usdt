import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { TICKER_WS_URL } from '../../constants';
import * as utils from '../../utils';
import * as actionTypes from '../actionTypes';

function initWebsocket() {
  return eventChannel((emitter: any) => {
    const ws: any = new WebSocket(TICKER_WS_URL);

    ws.onopen = (ev: Event) => {
      utils.logger.log('Opened @ticker WebSocket', ev);
      return emitter({ type: actionTypes.TICKER_WS_OPEN, ws });
    };

    ws.onerror = (ev: ErrorEvent) => {
      utils.logger.error('Error at @ticker WebSocket', ev);
      return emitter({
        type: actionTypes.TICKER_WS_ERROR,
        error: new Error('Error establishing WebSocket connection')
      });
    };

    ws.onmessage = (ev: MessageEvent) => {
      let message = null;

      try {
        message = JSON.parse(ev.data);
      } catch (e) {
        utils.logger.error('Error at parsing @ticker WebSocket data');
      }

      if (message) {
        return emitter({ type: actionTypes.TICKER_WS_MESSAGE, message });
      }
    };

    return () => {
      ws.close();
      utils.logger.log('Closed @ticker WebSocket');
    };
  });
}

export function* tickerSocket() {
  yield put({ type: actionTypes.TICKER_WS_LOADING });
  const channel = yield call(initWebsocket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
