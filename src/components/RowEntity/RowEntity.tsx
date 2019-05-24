import React from 'react';
import { connect } from 'react-redux';
import * as utils from '../../utils';
import styles from './RowEntity.module.css';

interface IRowEntity {
  entity: any;
  decimals: string;
}

function mapStateToProps(state: any) {
  return {
    decimals: state.commonReducer.decimals
  };
}

function RowEntity(props: IRowEntity) {
  const priceFormatted = utils.formatPrice(props.entity.price, +props.decimals);
  const timeFormatted = utils.formatTime(props.entity.time);

  return (
    <div className={styles.row} tabIndex={0}>
      {props.entity.price ? <span className={[
        styles.cell,
        styles.price,
        props.entity.isBuyer ? styles.ask : styles.bid
      ].join(' ')}>{priceFormatted}</span> : null}
      {
        props.entity.amount
          ? <span className={[styles.cell, styles.amount].join(' ')}>{props.entity.amount}</span>
          : null
      }
      {
        props.entity.time
          ? <span className={[styles.cell, styles.time].join(' ')}>{timeFormatted}</span>
          : null
      }
      {
        props.entity.total
          ? <span className={[styles.cell, styles.total].join(' ')}>{props.entity.total}</span>
          : null
      }
    </div>
  );
}

export default connect(mapStateToProps)(RowEntity);
