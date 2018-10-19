import axios from 'axios';

import { ROUTE, PORT } from '../../config';

export async function fetchCost(month, dayOfMonth, year, numberOfDays) {
  const {
    data: { totalCost },
  } = await axios.get(
    `http://localhost:${PORT}/${ROUTE}?startDate=${month}/${dayOfMonth}/${year}&numberOfDays=${Number(
      numberOfDays
    )}`
  );
  return totalCost;
}
