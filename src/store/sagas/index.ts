import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { orderBookSocket } from './orderBook';
import { tickerSocket } from './ticker';
import { tradesSocket } from './trades';

export function* watchTrades() {
  yield takeEvery(actionTypes.TRADES_WS_INIT, tradesSocket);
}

export function* watchTicker() {
  yield takeEvery(actionTypes.TICKER_WS_INIT, tickerSocket);
}

export function* watchOrderBook() {
  yield takeEvery(actionTypes.ORDERBOOK_WS_INIT, orderBookSocket);
}
