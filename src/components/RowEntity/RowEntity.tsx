import React from 'react';
import { connect } from 'react-redux';
import * as utils from '../../utils';
import styles from './RowEntity.module.css';

interface IRowEntity {
  entity: any;
}

interface IDecimals {
  decimals: string;
}

interface IEntity {
  price: string;
  amount: string;
  isBuyer: boolean;
  time: number;
  total: string;
}

function mapStateToProps(state: any) {
  return {
    decimals: state.commonReducer.decimals
  };
}

function RowEntity(props: IRowEntity & IDecimals) {
  const entity: IEntity = props.entity;
  const priceFormatted = utils.formatPrice(entity.price, +props.decimals);
  const timeFormatted = utils.formatTime(entity.time);

  return (
    <div className={styles.row} tabIndex={0}>
      {entity.price ? <span className={[
        styles.cell,
        styles.price,
        entity.isBuyer ? styles.ask : styles.bid
      ].join(' ')}>{priceFormatted}</span> : null}
      {
        entity.amount
          ? <span className={[styles.cell, styles.amount].join(' ')}>{entity.amount}</span>
          : null
      }
      {
        entity.time
          ? <span className={[styles.cell, styles.time].join(' ')}>{timeFormatted}</span>
          : null
      }
      {
        entity.total
          ? <span className={[styles.cell, styles.total].join(' ')}>{entity.total}</span>
          : null
      }
    </div>
  );
}

export default connect(mapStateToProps)(RowEntity);
