import React from 'react';
import moment from 'moment';
import axios from 'axios';

import { route, port } from '../config';
import { getDaysInMonth } from '../modules/bananas';

import SelectDate from './SelectDate';
import EnterNumDays from './EnterNumDays';
import CostDeclaration from './CostDeclaration';
import FetchButton from './FetchButton';
import Header from './Header';

const now = moment().format('MM-DD-YYYY');
const [month, dayOfMonth, year] = now.split('-');
const daysInMonth = getDaysInMonth(year, month);

class App extends React.Component {
  state = {
    year,
    month,
    dayOfMonth,
    daysInMonth,
    minimumDay: dayOfMonth,
    minimumMonth: month,
    numberOfDays: '',
  };

  getValidationState = () => {
    const n = this.state.numberOfDays;

    if (n && n.length && !isNaN(Number(n))) return 'success';
    return 'error';
  };

  fetchCost = () => {
    const { month, dayOfMonth, year, numberOfDays } = this.state;

    axios
      .post(`http://localhost:${port}/${route}`, {
        startDate: `${month}/${dayOfMonth}/${year}`,
        numberOfDays: Number(numberOfDays),
      })
      .then(({ data: { totalCost } }) => {
        this.setState({ totalCost });
      })
      .catch(error => {
        console.log('dang', error);
      });
  };

  handleYearChange = e => {
    const newYear = e.target.value;

    let newMinimumMonth = this.state.minimumMonth;
    let newMonth = this.state.month;
    let newMinimumDay = this.state.minimumDay;
    let newDayOfMonth = this.state.dayOfMonth;

    // Adjust month options based on year selection and current date
    if (Number(newYear) > Number(year)) {
      newMinimumMonth = '01';
      newMinimumDay = '01';
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
      totalCost: undefined,
    });
  };

  handleMonthChange = e => {
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
      totalCost: undefined,
    });
  };

  handleDayChange = e => {
    this.setState({
      dayOfMonth: e.target.value,
      totalCost: undefined,
    });
  };

  updateNumberDays = numDays => {
    this.setState({
      numberOfDays: numDays,
      totalCost: undefined,
    });
  };

  render() {
    return (
      <div className="container">
        <Header />

        <SelectDate
          minimumMonth={this.state.minimumMonth}
          minimumDay={this.state.minimumDay}
          daysInMonth={this.state.daysInMonth}
          presentYear={year}
          year={this.state.year}
          month={this.state.month}
          dayOfMonth={this.state.dayOfMonth}
          handleYearChange={this.handleYearChange}
          handleMonthChange={this.handleMonthChange}
          handleDayChange={this.handleDayChange}
        />

        <EnterNumDays
          getValidationState={this.getValidationState}
          numberOfDays={this.state.numberOfDays}
          updateNumberDays={this.updateNumberDays}
        />

        <FetchButton
          getValidationState={this.getValidationState}
          fetchCost={this.fetchCost}
        />

        <CostDeclaration totalCost={this.state.totalCost} />
      </div>
    );
  }
}

export default App;
