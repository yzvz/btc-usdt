import { takeEvery } from 'redux-saga/effects';
import { tradesSocket } from './trades';
import { miniTickerSocket } from './miniTicker';
import { orderBookSocket } from './orderBook';
import * as actionTypes from '../actionTypes';

export function* watchTrades() {
  yield takeEvery(actionTypes.TRADES_WS_INIT, tradesSocket);
}

export function* watchMiniTicker() {
  yield takeEvery(actionTypes.MINITICKER_WS_INIT, miniTickerSocket);
}

export function* watchOrderBook() {
  yield takeEvery(actionTypes.ORDERBOOK_WS_INIT, orderBookSocket);
}