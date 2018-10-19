import * as types from './action-types';
import * as api from '../api';

export function beginFetchCost(cost) {
  return {
    type: types.FETCH_COST,
    cost,
  };
}

export function fetchCostSuccess(cost) {
  return {
    type: types.FETCH_COST_SUCCESS,
    cost,
  };
}

export function fetchCostError(error) {
  return {
    type: types.FETCH_COST_ERROR,
    error,
  };
}

export function fetchCost(month, dayOfMonth, year, numberOfDays) {
  return async dispatch => {
    dispatch(beginFetchCost());
    try {
      const cost = await api.fetchCost(month, dayOfMonth, year, numberOfDays);
      dispatch(fetchCostSuccess(cost));
    } catch (err) {
      dispatch(fetchCostError(err));
    }
  };
}
