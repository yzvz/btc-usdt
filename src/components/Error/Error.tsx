import React from 'react';
import styles from './Error.module.css';

interface IError {
  error: Error;
}

const Error = (props: IError) => {
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
