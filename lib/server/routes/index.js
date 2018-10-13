const router = require('express').Router();
const { bananas } = require('../../modules');
const moment = require('moment');

/*
	Responds with 'totalCost' based on startDate and numberOfDays

	startDate: (MM/DD/YYYY)
	numberOfDays: number of calendar days to calculate cost for, 
	starting on the startDate and including weekends
*/
router.post('/bananas', (req, res, next) => {
  const { startDate, numberOfDays } = req.body;
  const cost = bananas.calculateCost(startDate, Number(numberOfDays));

  const roundedCost = Math.round(cost * 100) / 100;

  res.status(200).json({ totalCost: roundedCost });
});

module.exports = router;
