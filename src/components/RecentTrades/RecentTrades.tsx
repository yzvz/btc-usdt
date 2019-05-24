import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initTradesWS } from '../../store/actions/trade';
import ColHead from '../ColHead/ColHead';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import RowEntity from '../RowEntity/RowEntity';
import styles from './RecentTrades.module.css';

interface ITrades {
  trades: any;
  ws: any;
  error: Error;
  loading: boolean;
  initTradesWS: any;
}

function mapStateToProps(state: any) {
  return {
    trades: state.tradesReducer.trades,
    ws: state.tradesReducer.ws,
    error: state.tradesReducer.error,
    loading: state.tradesReducer.loading
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    initTradesWS: () => dispatch(initTradesWS())
  };
}

class RecentTrades extends Component<ITrades> {
  public componentDidMount() {
    if (this.props.ws === null) {
      this.props.initTradesWS();
    }
  }

  public render() {
    let trades = null;

    if (this.props.loading) {
      trades = <Loader />;
    } else if (this.props.error) {
      trades = <Error error={this.props.error} />;
    } else {
      trades =
        <div className={styles.entries}>
          {this.props.trades.map((t: any) =>
            <RowEntity key={t.t} entity={{
              price: t.p,
              amount: t.q,
              time: t.T,
              isBuyer: t.m
            }} />
          )}
        </div>;
    }

    return (
      <div className={styles.trades}>
        <ColHead labels={['Price(USDT)', 'Amount(BTC)', 'Time']} />
        <div className={styles.wrap}>{trades}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(RecentTrades);
