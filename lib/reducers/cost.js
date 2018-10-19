import * as types from '../actions/action-types';

const initialState = {
  cost: '',
  loading: false,
  error: '',
};

export default function date(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_COST:
      return {
        ...initialState,
        loading: true,
      };
    case types.FETCH_COST_SUCCESS:
      return {
        ...initialState,
        cost: action.cost,
      };
    case types.FETCH_COST_ERROR:
      return {
        ...initialState,
        error: action.error,
      };
    case types.UPDATE_DATE_STATE:
      return initialState;
    case types.UPDATE_NUMBER_DAYS:
      return initialState;
    default:
      return state;
  }
}
