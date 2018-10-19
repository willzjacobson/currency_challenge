import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

class EnterNumDays extends React.Component {
  handleNumberChange = e => {
    this.props.handleInput(e.target.value);
  };

  render() {
    return (
      <div>
        <h4>Please enter a number of days</h4>
        <FormGroup
          controlId="formBasicText"
          validationState={this.props.getValidationState()}
        >
          <FormControl
            type="text"
            value={this.props.numberOfDays}
            placeholder="Enter number"
            onChange={this.handleNumberChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </div>
    );
  }
}

export default EnterNumDays;
