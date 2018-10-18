import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as dateActions from '../actions/date-actions';
import { getDaysInMonth } from '../../modules/bananas';
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
};

function stringifyMonth(m) {
  return m < 10 ? `0${m.toString()}` : m.toString();
}

class SelectDate extends Component {
  handleYearChange = e => {
    const {
      presentYear,
      month,
      presentMonth,
      minimumMonth,
      dayOfMonth,
      minimumDay,
      presentDay,
    } = this.props;

    const newYear = e.target.value;

    let newMinimumMonth = minimumMonth;
    let newMonth = month;
    let newMinimumDay = minimumDay;
    let newDayOfMonth = dayOfMonth;

    // Adjust month options based on year selection and current date
    if (Number(newYear) > Number(presentYear)) {
      newMinimumMonth = '01';
      newMinimumDay = '01';
    } else if (Number(month) < Number(presentMonth)) {
      newMinimumMonth = presentMonth;
      newMonth = presentMonth;
    }

    // Adjust day options based on year and month selections and current date
    if (newYear == presentYear && newMonth == month) {
      if (Number(dayOfMonth) < Number(presentDay)) {
        newDayOfMonth = presentDay;
        newMinimumDay = presentDay;
      }
    }

    this.props.actions.updateDateState({
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
    const {
      year,
      presentYear,
      month,
      dayOfMonth,
      presentDay,
      minimumDay,
    } = this.props;

    const newMonth = e.target.value;

    let newMinimumDay = minimumDay;
    let newDay = dayOfMonth;

    // Adjust day options based on month selection and current date
    if (Number(newMonth) > Number(month)) {
      newMinimumDay = '01';
    } else if (year == presentYear) {
      newMinimumDay = presentDay;
      if (Number(newDay) < Number(presentDay)) {
        newDay = presentDay;
      }
    }

    this.props.actions.updateDateState({
      minimumDay: newMinimumDay,
      dayOfMonth: newDay,
      month: newMonth,
      daysInMonth: getDaysInMonth(year, newMonth),
      totalCost: undefined,
    });
  };

  handleDayChange = e => {
    this.props.actions.updateDateState({
      dayOfMonth: e.target.value,
      totalCost: undefined,
    });
  };

  render() {
    const {
      presentYear,
      year,
      month,
      dayOfMonth,
      minimumMonth,
      minimumDay,
      daysInMonth,
    } = this.props;

    const yearOptions = [];
    for (let i = 0; i < 3; i++) {
      yearOptions.push(
        <option key={i} value={(Number(presentYear) + i).toString()}>
          {(Number(presentYear) + i).toString()}
        </option>
      );
    }

    const monthOptions = [];
    for (let i = Number(minimumMonth); i <= 12; i++) {
      monthOptions.push(
        <option key={i} value={stringifyMonth(i)}>
          {monthDictionary[stringifyMonth(i)]}
        </option>
      );
    }

    const dayOptions = [];
    for (let i = Number(minimumDay); i <= daysInMonth; i++) {
      dayOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
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
                onChange={this.handleYearChange}
                options={yearOptions}
              />
            </Col>
            <Col xs={12} md={4}>
              <Select
                labelText="Month"
                value={month}
                onChange={this.handleMonthChange}
                options={monthOptions}
              />
            </Col>
            <Col xs={12} md={4}>
              <Select
                labelText="Day"
                value={dayOfMonth}
                onChange={this.handleDayChange}
                options={dayOptions}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    presentYear: state.date.presentYear,
    year: state.date.year,
    month: state.date.month,
    presentMonth: state.date.presentMonth,
    dayOfMonth: state.date.dayOfMonth,
    presentDay: state.date.presentDay,
    daysInMonth: state.date.daysInMonth,
    minimumDay: state.date.minimumDay,
    minimumMonth: state.date.minimumMonth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dateActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDate);
