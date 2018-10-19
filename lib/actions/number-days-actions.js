import { UPDATE_NUMBER_DAYS } from './action-types';

export function updateNumberDays(numberOfDays) {
  return {
    type: UPDATE_NUMBER_DAYS,
    numberOfDays,
  };
}
