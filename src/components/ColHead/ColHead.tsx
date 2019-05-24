import React from 'react';
import styles from './ColHead.module.css';

interface ILabels {
  labels: any;
}

const ColHead = (props: ILabels) => {
  return (
    <div className={styles.colhead}>
      {props.labels.map((l: any, i: number) =>
        <span className={styles.label} key={i}>{l}</span>
      )}
    </div>
  );
};

export default ColHead;
