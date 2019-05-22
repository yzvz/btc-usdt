import { takeEvery } from 'redux-saga/effects';
import { tradesSocket } from './trades';
import { tickerSocket } from './ticker';
import { orderBookSocket } from './orderBook';
import * as actionTypes from '../actionTypes';

export function* watchTrades() {
  yield takeEvery(actionTypes.TRADES_WS_INIT, tradesSocket);
}

export function* watchTicker() {
  yield takeEvery(actionTypes.TICKER_WS_INIT, tickerSocket);
}

export function* watchOrderBook() {
  yield takeEvery(actionTypes.ORDERBOOK_WS_INIT, orderBookSocket);
}