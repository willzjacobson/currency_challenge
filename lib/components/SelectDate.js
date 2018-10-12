import React from 'react';
import { ControlLabel, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';

import Select from './Select';

const monthDictionary = {
	'01': 'January',
	'02': 'February',
	'03': 'March',
	'04': 'April',
	'05': 'May',
	'06': 'June',
	'07': 'July',
	'08': 'August',
	'09': 'September',
	'10': 'October',
	'11': 'November',
	'12': 'December',
}

function stringifyMonth(m) {
	return m < 10 ? `0${m.toString()}` : m.toString();
}


const SelectDate = ({ 
	minimumMonth,
	minimumDay, 
	daysInMonth,
	presentYear,
	year,
	month,
	dayOfMonth,
	handleYearChange,
	handleMonthChange,
	handleDayChange
}) => {
	const yearOptions = [];
	for (let i = 0; i < 3; i++) {
		yearOptions.push(
			<option
				key={i}
				value={(Number(presentYear) + i).toString()}
			>
				{(Number(presentYear) + i).toString()}
			</option>
		);
	}

	const monthOptions = [];
	for (let i = Number(minimumMonth); i <= 12; i++) {
		monthOptions.push(
			<option 
				key={i}	
				value={stringifyMonth(i)}
			>
				{monthDictionary[stringifyMonth(i)]}
			</option>
		)
	}

	const dayOptions = [];
	for (let i = Number(minimumDay); i <= daysInMonth; i++) {
		dayOptions.push(<option key={i} value={i}>{i}</option>)
	}

	return (
		<div>
			<h4>Please select a starting date</h4>
			<Grid>
				<Row>
					<Col xs={12} md={4}>
						<Select
							labelText="Year"
							value={year}
							onChange={handleYearChange}
							options={yearOptions}
						/>
					</Col>
					<Col xs={12} md={4}>
						<Select
							labelText="Month"
							value={month}
							onChange={handleMonthChange}
							options={monthOptions}
						/>
					</Col>
					<Col xs={12} md={4}>
						<Select
							labelText="Day"
							value={dayOfMonth}
							onChange={handleDayChange}
							options={dayOptions}
						/>
					</Col>
				</Row>
			</Grid>
		</div>
	);
}

export default SelectDate;

		