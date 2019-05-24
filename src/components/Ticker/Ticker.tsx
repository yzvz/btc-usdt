import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initTickerWS } from '../../store/actions/ticker';
import * as utils from '../../utils';
import DecimalsControl from '../DecimalsControl/DecimalsControl';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import styles from './Ticker.module.css';

interface ITicker {
  lastPrice: string;
  isBuyer: boolean;
  closePrice: string;
  highPrice: string;
  lowPrice: string;
  quoteVolume: string;
  priceChange: string;
  priceChangePercent: string;
  ws: any;
  error: Error;
  loading: boolean;
  initTickerWS: any;
  decimals: string;
}

function mapStateToProps(state: any) {
  return {
    lastPrice: state.tradesReducer.lastPrice,
    isBuyer: state.tradesReducer.isBuyer,
    closePrice: state.tickerReducer.closePrice,
    highPrice: state.tickerReducer.highPrice,
    lowPrice: state.tickerReducer.lowPrice,
    quoteVolume: state.tickerReducer.quoteVolume,
    priceChange: state.tickerReducer.priceChange,
    priceChangePercent: state.tickerReducer.priceChangePercent,
    error: state.tickerReducer.error,
    loading: state.tickerReducer.loading,
    ws: state.tickerReducer.ws,
    decimals: state.commonReducer.decimals
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    initTickerWS: () => dispatch(initTickerWS())
  };
}

class Ticker extends Component<ITicker> {
  public componentDidMount() {
    if (this.props.ws === null) {
      this.props.initTickerWS();
    }
  }

  public render() {
    let ticker = null;

    if (this.props.loading) {
      ticker = <Loader />;
    } else if (this.props.error) {
      ticker = <Error error={this.props.error} />;
    } else {
      const lastPrice = this.props.lastPrice || this.props.closePrice;
      const decimals = +this.props.decimals;
      const { highPrice, lowPrice, quoteVolume, priceChange, priceChangePercent } = this.props;
      const priceChangeParsed = parseFloat(priceChange);
      const change = priceChangeParsed > 0 ? styles.positive : priceChangeParsed < 0 ? styles.negative : '';
      const changeSign = priceChangeParsed > 0 ? '+' : '';
      const lastPriceFormatted = utils.formatPrice(lastPrice, decimals);
      const highPriceFormatted = utils.formatPrice(highPrice, decimals);
      const lowPriceFormatted = utils.formatPrice(lowPrice, decimals);
      const priceChangeFormatted = utils.formatPrice(priceChange, decimals);
      const priceChangePercentFormatted = utils.formatPercent(priceChangePercent);
      const volumeFormatted = utils.formatAmount(quoteVolume);

      ticker =
        <React.Fragment>
          {lastPrice ?
            <div className={styles.entity}>
              <p className={styles.label}>Last price</p>
              <p className={[
                styles.value,
                this.props.isBuyer === true
                  ? styles.ask
                  : this.props.isBuyer === false
                    ? styles.bid
                    : ''
              ].join(' ')}>{lastPriceFormatted}</p>
            </div>
            : null}
          {priceChange ?
            <div className={styles.entity}>
              <p className={styles.label}>24h Change</p>
              <p className={[styles.value, change].join(' ')}>
                {changeSign}{priceChangeFormatted}&nbsp;&nbsp;&nbsp;{changeSign}{priceChangePercentFormatted}
              </p>
            </div>
          : null}
          {highPrice ?
            <div className={styles.entity}>
              <p className={styles.label}>24h High</p>
              <p className={styles.value}>{highPriceFormatted}</p>
            </div>
            : null}
          {lowPrice ?
            <div className={styles.entity}>
              <p className={styles.label}>24h Low</p>
              <p className={styles.value}>{lowPriceFormatted}</p>
            </div>
            : null}
          {quoteVolume ?
            <div className={styles.entity}>
              <p className={styles.label}>24h Volume</p>
              <p className={styles.value}>{volumeFormatted} USDT</p>
            </div>
            : null}
          <DecimalsControl />
        </React.Fragment>;

      document.title = lastPrice ? lastPriceFormatted + ' | BTC/USDT | Buy Bitcoin' : document.title;
    }

    return (
      <div className={styles.ticker}>
        {ticker}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ticker);
