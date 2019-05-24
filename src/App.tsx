import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import './App.css';
import OrderBook from './components/OrderBook/OrderBook';
import RecentTrades from './components/RecentTrades/RecentTrades';
import Ticker from './components/Ticker/Ticker';
import commonReducer from './store/reducers/common';
import orderBookReducer from './store/reducers/orderBook';
import tickerReducer from './store/reducers/ticker';
import tradesReducer from './store/reducers/trades';
import { watchOrderBook, watchTicker, watchTrades } from './store/sagas';

const sagaMiddleware = createSagaMiddleware();
const componseEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ tradesReducer, tickerReducer, commonReducer, orderBookReducer });

const store = createStore(rootReducer,
  componseEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(watchTrades);
sagaMiddleware.run(watchTicker);
sagaMiddleware.run(watchOrderBook);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="layout">
          <div className="layout__header">
            <Ticker />
          </div>
          <div className="layout__2cols">
            <div className="layout__col">
              <OrderBook />
            </div>
            <div className="layout__col">
              <RecentTrades />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
