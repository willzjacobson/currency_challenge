import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ControlLabel, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';

import { route, port } from '../config';

import { getDaysInMonth } from '../modules/bananas';
250
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

const now = moment().format('MM-DD-YYYY');
const [ month, dayOfMonth, year ] = now.split('-');
const daysInMonth = getDaysInMonth(year, month);


class App extends React.Component {

	state = {
		year,
		month,
		dayOfMonth,
		daysInMonth,
		minimumDay: dayOfMonth,
		minimumMonth: month,
		numberOfDays: ''
	}

	calculateCost = () => {
		const { month, dayOfMonth, year, numberOfDays } = this.state;

		axios.post(`http://localhost:${port}/${route}`, {
		    startDate: `${month}/${dayOfMonth}/${year}`,
		    numberOfDays: Number(numberOfDays),
		})
		.then(({ data: { totalCost } }) => {
		    this.setState({ totalCost })
		})
		.catch(error => {
		    console.log('dang', error);
		});
	}

	getValidationState() {
		const n = this.state.numberOfDays;

	    if (n && n.length && !isNaN(Number(n))) return 'success'
	    return 'error';
	}

	handleYearChange = (e) => {
		const newYear = e.target.value;

		let newMinimumMonth = this.state.minimumMonth;
		let newMonth = this.state.month;
		let newMinimumDay = this.state.minimumDay;
		let newDayOfMonth = this.state.dayOfMonth;

		// Adjust month options based on year selection and current date
		if (Number(newYear) > Number(year)) {
			newMinimumMonth = '01';
		} else if (Number(this.state.month) < Number(month)) {
			newMinimumMonth = month;
			newMonth = month;
		}

		// Adjust day options based on year and month selections and current date
		if (newYear === year && newMonth === month) {
			newMinimumDay = dayOfMonth;
			if (Number(this.state.dayOfMonth) > dayOfMonth) {
				newDayOfMonth = dayOfMonth;
			}
		}

		this.setState({
			year: e.target.value,
			daysInMonth: getDaysInMonth(newYear, newMonth),
			minimumMonth: newMinimumMonth,
			month: newMonth,
			minimumDay: newMinimumDay,
			dayOfMonth: newDayOfMonth,
			totalCost: undefined
		});
	}

	handleMonthChange = (e) => {
		const newMonth = e.target.value;

		let newMinimumDay = this.state.minimumDay;
		let newDay = this.state.dayOfMonth;

		// Adjust day options based on month selection and current date
		if (Number(newMonth) > Number(month)) {
			newMinimumDay = '01';
		} else if (this.state.year === year && newMonth === month) {
			newMinimumDay = dayOfMonth;
			newDay = dayOfMonth;
		}

		this.setState({
			minimumDay: newMinimumDay,
			day: newDay,
			month: newMonth,
			daysInMonth: getDaysInMonth(year, newMonth),
			totalCost: undefined
		});
	}

	handleDayChange = (e) => {
		this.setState({
			dayOfMonth: e.target.value,
			totalCost: undefined
		});
	}

	handleNumberChange = (e) => {
		this.setState({
			numberOfDays: e.target.value,
			totalCost: undefined
		});
	}

	render() {
		const yearOptions = [];
		for (let i = 0; i < 3; i++) {
			yearOptions.push(
				<option
					key={i}
					value={(Number(year) + i).toString()}
				>
					{(Number(year) + i).toString()}
				</option>
			);
		}

		const monthOptions = [];
		for (let i = Number(this.state.minimumMonth); i <= 12; i++) {
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
		for (let i = Number(this.state.minimumDay); i <= this.state.daysInMonth; i++) {
			dayOptions.push(<option key={i} value={i}>{i}</option>)
		}

		const { totalCost } = this.state;
		const costDeclaration = typeof totalCost === 'number' ?
			<h5>Cost will be ${ totalCost}</h5> :
			null;

		return (
			<div className="container">

				<h1>Bob's Bananas</h1>
				<h4>Please select a starting date</h4>

				<Grid>
					<Row>
						<Col xs={12} md={4}>
							<FormGroup controlId="formControlsSelect">
						      	<ControlLabel>Year</ControlLabel>
						      	<FormControl
						      		componentClass="select"
						      		value={this.state.year}
						      		onChange={this.handleYearChange}
						      	>
						        	{yearOptions}
						      	</FormControl>
						    </FormGroup>
						</Col>

						<Col xs={12} md={4}>
							<FormGroup controlId="formControlsSelect">
						      	<ControlLabel>Month</ControlLabel>
						      	<FormControl
						      		componentClass="select"
						      		value={this.state.month}
						      		onChange={this.handleMonthChange}
						      	>
						        	{monthOptions}
						      	</FormControl>
						    </FormGroup>
						</Col>

						<Col xs={12} md={4}>
						    <FormGroup controlId="formControlsSelect">
						      <ControlLabel>Day</ControlLabel>
						      <FormControl
						      	componentClass="select"
						      	value={this.state.dayOfMonth}
						      	onChange={this.handleDayChange}
						      >
						        {dayOptions}
						      </FormControl>
						    </FormGroup>
						</Col>
					</Row>
				</Grid>

				<h4>Please enter a number of days</h4>
				<FormGroup
		         	controlId="formBasicText"
		          	validationState={this.getValidationState()}
		        >
		          	<FormControl
			            type="text"
			            value={this.state.numberOfDays}
			            placeholder="Enter number"
			            onChange={this.handleNumberChange}
		          	/>
		          	<FormControl.Feedback />
		        </FormGroup>

				<Button
					bsStyle="primary"
					disabled={this.getValidationState() === 'error'}
					onClick={this.calculateCost}
				>
					Calculate
				</Button>

				{costDeclaration}
			</div>
		);
	}
}

export default App;
