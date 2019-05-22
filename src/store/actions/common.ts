import * as actionTypes from '../actionTypes';

export const setDecimals = (decimals: string) => {
  return { type: actionTypes.COMMON_SET_DECIMALS, decimals }
}