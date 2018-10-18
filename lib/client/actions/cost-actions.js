import { UPDATE_TOTAL_COST } from './action-types';

export function updateTotalCost(cost) {
  return {
    type: UPDATE_TOTAL_COST,
    cost,
  };
}
