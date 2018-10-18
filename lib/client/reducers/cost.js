import { UPDATE_TOTAL_COST } from '../actions/action-types';
import { UPDATE_DATE_STATE } from '../actions/action-types';
import { UPDATE_NUMBER_DAYS } from '../actions/action-types';

const initialState = '';

export default function date(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOTAL_COST:
      return action.cost;
    case UPDATE_DATE_STATE:
      return '';
    case UPDATE_NUMBER_DAYS:
      return '';
    default:
      return state;
  }
}
