import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initMiniTickerWS } from '../../store/actions/miniTicker';
import DecimalsControl from '../DecimalsControl/DecimalsControl';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import * as utils from "../../utils";
import styles from './MiniTicker.module.css';

interface Ticker {
  lastPrice: string,
  isBuyer: boolean,
  closePrice: string,
  highPrice: string,
  lowPrice: string,
  quoteVolume: string,
  ws: any,
  error: Error,
  loading: boolean,
  initMiniTickerWS: any,
  decimals: string
}

function mapStateToProps(state: any) {
  return {
    lastPrice: state.tradesReducer.lastPrice,
    isBuyer: state.tradesReducer.isBuyer,
    closePrice: state.miniTickerReducer.closePrice,
    highPrice: state.miniTickerReducer.highPrice,
    lowPrice: state.miniTickerReducer.lowPrice,
    quoteVolume: state.miniTickerReducer.quoteVolume,
    error: state.miniTickerReducer.error,
    loading: state.miniTickerReducer.loading,
    ws: state.miniTickerReducer.ws,
    decimals: state.commonReducer.decimals
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    initMiniTickerWS: () => dispatch(initMiniTickerWS())
  }
}

class MiniTicker extends Component<Ticker> {
  componentDidMount() {
    if (this.props.ws === null) {
      this.props.initMiniTickerWS();
    }
  }

  render() {
    let miniTicker = null;

    if (this.props.loading) {
      miniTicker = <Loader />;
    } else if (this.props.error) {
      miniTicker = <Error error={this.props.error} />;
    } else {
      const lastPrice = this.props.lastPrice || this.props.closePrice;
      const lastPriceFormatted = utils.formatPrice(lastPrice, +this.props.decimals);
      const highPriceFormatted = utils.formatPrice(this.props.highPrice, +this.props.decimals);
      const lowPriceFormatted = utils.formatPrice(this.props.lowPrice, +this.props.decimals);
      const volumeFormatted = utils.formatAmount(this.props.quoteVolume);

      miniTicker = 
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
          {this.props.highPrice ?
            <div className={styles.entity}>
              <p className={styles.label}>24h High</p>
              <p className={styles.value}>{highPriceFormatted}</p>
            </div>
            : null}
          {this.props.lowPrice ?
            <div className={styles.entity}>
              <p className={styles.label}>24h Low</p>
              <p className={styles.value}>{lowPriceFormatted}</p>
            </div>
            : null}
          {this.props.quoteVolume ?
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
      <div className={styles.miniticker}>
        {miniTicker}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniTicker);