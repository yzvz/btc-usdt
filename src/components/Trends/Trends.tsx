import React from 'react';
import { connect } from 'react-redux';
import * as utils from "../../utils";
import styles from './Trends.module.css';

interface Trend {
  decimals: string,
  lastPrice: string,
  closePrice: string,
  isBuyer: boolean
}

function mapStateToProps(state: any) {
  return {
    lastPrice: state.tradesReducer.lastPrice,
    isBuyer: state.tradesReducer.isBuyer,
    closePrice: state.tickerReducer.closePrice,
    decimals: state.commonReducer.decimals
  }
}

const Trends = (props: Trend) => {
  const lastPrice = props.lastPrice || props.closePrice;
  const lastPriceFormatted = utils.formatPrice(lastPrice, +props.decimals);

  const trends = lastPrice ? <React.Fragment>
      <span className={[
        styles.trend, 
        props.isBuyer === true 
          ? styles.ask 
          : props.isBuyer === false 
            ? styles.bid
            : ''
        ].join(' ')}>{lastPriceFormatted}</span>
    </React.Fragment> : null;
  
  return (
    <div className={styles.trends}>{trends}</div>
  );
};

export default connect(mapStateToProps)(Trends);