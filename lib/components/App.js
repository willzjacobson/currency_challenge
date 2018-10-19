import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as numDaysActions from '../actions/number-days-actions';
import * as costActions from '../actions/cost-actions';

import SelectDate from './SelectDate';
import EnterNumDays from './EnterNumDays';
import CostDeclaration from './CostDeclaration';
import FetchButton from './FetchButton';
import Header from './Header';

class App extends Component {
  getValidationState = () => {
    const n = this.props.numberOfDays;

    if (n && n.length && !isNaN(Number(n))) return 'success';
    return 'error';
  };

  fetchCost = () => {
    const { month, dayOfMonth, year, numberOfDays } = this.props;
    this.props.costActions.fetchCost(month, dayOfMonth, year, numberOfDays);
  };

  render() {
    return (
      <div className="container">
        <Header />
        <SelectDate />
        <EnterNumDays
          getValidationState={this.getValidationState}
          numberOfDays={this.props.numberOfDays}
          handleInput={this.props.daysActions.updateNumberDays}
        />
        <FetchButton
          getValidationState={this.getValidationState}
          handleClick={this.fetchCost}
        />
        <CostDeclaration costInfo={this.props.cost} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    numberOfDays: state.numberOfDays,
    month: state.date.month,
    dayOfMonth: state.date.dayOfMonth,
    year: state.date.year,
    cost: state.cost,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    daysActions: bindActionCreators(numDaysActions, dispatch),
    costActions: bindActionCreators(costActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
