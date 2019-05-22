import React from 'react';
import styles from './Error.module.css';

interface ErrorObject {
  error: any
}

const Error = (props: ErrorObject) => {
  return (
    <div className={styles.error}>
      <p className={styles.message}>{
        props.error.message 
          ? props.error.message 
          : 'Error occured. Please check you configuration and try again later.'}
      </p>
    </div>
  );
};

export default Error;