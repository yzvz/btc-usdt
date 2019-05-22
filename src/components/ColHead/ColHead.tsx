import React from 'react';
import styles from './ColHead.module.css';

interface Labels {
  labels: any
}

const ColHead = (props: Labels) => {
  return (
    <div className={styles.colhead}>
      {props.labels.map((l: any, i: number) =>
        <span className={styles.label} key={i}>{l}</span>
      )}
    </div>
  );
};

export default ColHead;