import { combineReducers } from 'redux';

import date from './date';
import numberOfDays from './numberOfDays';
import cost from './cost';

const rootReducer = combineReducers({
  cost,
  date,
  numberOfDays,
});

export default rootReducer;
