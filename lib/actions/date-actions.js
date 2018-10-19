import { UPDATE_DATE_STATE } from './action-types';

export function updateDateState(newState) {
  console.log('newState', newState);
  return {
    type: UPDATE_DATE_STATE,
    newState,
  };
}
