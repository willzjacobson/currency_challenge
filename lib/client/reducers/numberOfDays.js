import { UPDATE_NUMBER_DAYS } from '../actions/action-types';

const initialState = '';

export default function date(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NUMBER_DAYS:
      return action.numberOfDays;
    default:
      return state;
  }
}
