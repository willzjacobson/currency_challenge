import React from 'react';
import { ControlLabel, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';

const Select = ({ labelText, value, onChange, options }) => (
	<FormGroup controlId="formControlsSelect">
      	<ControlLabel>{labelText}</ControlLabel>
      	<FormControl
      		componentClass="select"
      		value={value}
      		onChange={onChange}
      	>
        	{options}
      	</FormControl>
    </FormGroup>
)

export default Select;