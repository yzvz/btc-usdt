import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import OrderBook from './components/OrderBook/OrderBook';
import RecentTrades from './components/RecentTrades/RecentTrades';
import MiniTicker from './components/MiniTicker/MiniTicker';
import tradesReducer from './store/reducers/trades';
import commonReducer from './store/reducers/common';
import miniTickerReducer from './store/reducers/miniTicker';
import orderBookReducer from './store/reducers/orderBook';
import { watchTrades, watchMiniTicker, watchOrderBook } from './store/sagas';
import './App.css';
import Loader from './components/Loader/Loader';

const sagaMiddleware = createSagaMiddleware();
const componseEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ tradesReducer, miniTickerReducer, commonReducer, orderBookReducer });

const store = createStore(rootReducer,
  componseEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(watchTrades);
sagaMiddleware.run(watchMiniTicker);
sagaMiddleware.run(watchOrderBook);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="layout">
          <div className="layout__header">
            <MiniTicker />
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
}

export default App;
