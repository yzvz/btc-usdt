import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDecimals } from '../../store/actions/common';
import styles from './DecimalsControl.module.css';

interface DControl {
  decimals: string,
  setDecimals: any
}

function mapStateToProps(state: any) {
  return {
    decimals: state.commonReducer.decimals
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setDecimals: (decimals: string) => dispatch(setDecimals(decimals))
  };
}

class DecimalsControl extends Component<DControl> {
  handleDecimalChange (ev: React.ChangeEvent) {
    const target: any = ev.target; 
    const value = target.value;

    if (value !== this.props.decimals) {
      this.props.setDecimals(value);
    }
  }

  render() {
    return (
      <div className={styles.control}>
        <label className={styles.label}>groups:</label>
        <select className={styles.select} onChange={(e) => this.handleDecimalChange(e)} defaultValue={this.props.decimals}>
          <option value="0">0 decimals</option>
          <option value="1">1 decimals</option>
          <option value="2">2 decimals</option>
        </select>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(DecimalsControl);