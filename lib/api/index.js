import axios from 'axios';
import Promise from 'bluebird';

import { ROUTE, PORT } from '../config';

export async function fetchCost(month, dayOfMonth, year, numberOfDays) {
  await Promise.delay(1000);
  const {
    data: { totalCost },
  } = await axios.get(
    `http://localhost:${PORT}/${ROUTE}?startDate=${month}/${dayOfMonth}/${year}&numberOfDays=${Number(
      numberOfDays
    )}`
  );
  return totalCost;
}
