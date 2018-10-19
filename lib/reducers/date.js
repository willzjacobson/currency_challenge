import moment from 'moment';

import { UPDATE_DATE_STATE } from '../actions/action-types';

import { getDaysInMonth } from '../modules/bananas';

const now = moment().format('MM-DD-YYYY');
const [month, dayOfMonth, year] = now.split('-');
const daysInMonth = getDaysInMonth(year, month);

const initialState = {
  presentYear: year,
  presentMonth: month,
  year,
  month,
  dayOfMonth,
  presentDay: dayOfMonth,
  daysInMonth,
  minimumDay: dayOfMonth,
  minimumMonth: month,
};

export default function date(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATE_STATE:
      return Object.assign({}, state, action.newState);
    default:
      return state;
  }
}
