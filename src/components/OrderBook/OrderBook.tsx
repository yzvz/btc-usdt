import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initOrderBookWS } from '../../store/actions/orderBook';
import * as utils from '../../utils';
import ColHead from '../ColHead/ColHead';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import RowEntity from '../RowEntity/RowEntity';
import Trends from '../Trends/Trends';
import styles from './OrderBook.module.css';

interface IOrderBook {
  ws: WebSocket | null;
  error: Error | null;
  loading: boolean;
  asks: any[];
  bids: any[];
  initOrderBookWS: any;
}

function mapStateToProps(state: any) {
  return {
    ws: state.orderBookReducer.ws,
    error: state.orderBookReducer.error,
    asks: state.orderBookReducer.asks,
    bids: state.orderBookReducer.bids,
    loading: state.orderBookReducer.loading
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    initOrderBookWS: () => dispatch(initOrderBookWS())
  };
}

class OrderBook extends Component<IOrderBook> {
  public componentDidMount() {
    if (this.props.ws === null) {
      this.props.initOrderBookWS();
    }
  }

  public render() {
    let asks = null;
    let bids = null;

    if (this.props.loading) {
      asks = bids = <Loader />;
    } else if (this.props.error) {
      asks = bids = <Error error={this.props.error} />;
    } else {
      asks = this.props.asks.map((e: any, i: number) =>
        <RowEntity key={e.E + '' + i} entity={{
          price: e[0],
          amount: e[1],
          total: utils.getTotal(e[0], e[1]),
          isBuyer: true
        }} />
      );

      bids = this.props.bids.map((e: any, i: number) =>
        <RowEntity key={e.E + '' + i} entity={{
          price: e[0],
          amount: e[1],
          total: utils.getTotal(e[0], e[1])
        }} />
      );
    }

    return (
      <div className={styles.orderbook}>
        <ColHead labels={['Price(USDT)', 'Amount(BTC)', 'Total(USDT)']} />
        <section className={styles.section}>{asks}</section>
        <Trends />
        <section className={styles.section}>{bids}</section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(OrderBook);
