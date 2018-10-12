const moment = require('moment');


// keys are weeks of the month, values are price of a banana in $
const priceByWeekDictionary = {
	'1': .05,
	'2': .10,
	'3': .15,
	'4': .20,
	'5': .25,
};


// date String: MM/DD/YYYY
// daysRemaining Number
// returns object containing totalCost Number
exports.calculateCost = (date, daysRemaining, totalCost = 0) => {
	const [ month, day, year ] = date.split('/');
	const dayAsNumber = Number(day);

	const daysInMonth = exports.getDaysInMonth(year, month);
	const daysLeftInMonth = daysInMonth - dayAsNumber + 1;

	const lastPurchaseDayOfMonth = (daysRemaining >= daysLeftInMonth) ?
		daysInMonth :
		dayAsNumber + daysRemaining - 1;

	console.log('lastPurchaseDayOfMonth', lastPurchaseDayOfMonth)
	totalCost += exports.calculateCostFromThisMonth(month, year, dayAsNumber, lastPurchaseDayOfMonth);

	daysRemaining -= daysLeftInMonth;

	if (daysRemaining <= 0) return totalCost;

	const { updatedYear, updatedMonth } = exports.tickMonth(year, month);

	return exports.calculateCost(`${updatedMonth}/01/${updatedYear}`, daysRemaining, totalCost, false);
}


// Returns the number of days in a given month
exports.getDaysInMonth = (year, month) => {
	return moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
}


// Determines the month and year in MomentJS format of one month in the future
exports.tickMonth = (currentYear, currentMonth) => {
	const m = moment(`${currentYear}-${currentMonth}`, 'YYYY-MM').add(1, 'months');

	return {
		updatedMonth: m.format('MM'),
		updatedYear: m.format('YYYY')
	};
}

// Calculate $ spent on bananas for a given month
exports.calculateCostFromThisMonth = (month, year, startDayThisMonth, endDayThisMonth) => {
	let costForThisMonth = 0;

	console.log(startDayThisMonth, endDayThisMonth)

	for (let i = startDayThisMonth; i <= endDayThisMonth; i++) {
		// Determine what day of the week this is
		const dayOfWeek = moment(`${year}-${month}-${exports.formatDayOrMonth(i)}`, 'YYYY-MM-DD').day();

		// If not a weekend day, add the cost of today's banana to the running total
		if (dayOfWeek !== 0 && dayOfWeek !== 6) {  // 0 = Sunday, 6 = Saturday
			const week = Math.ceil(i / 7);
			costForThisMonth += priceByWeekDictionary[week];
		}
	}
	return costForThisMonth;
}


// Insure proper formatting of day or month for MomentJS
exports.formatDayOrMonth = dayOrMonth => {
	if ( Number(dayOrMonth) >= 10 ) {
		return dayOrMonth;
	}

	return `0${dayOrMonth}`;
}





