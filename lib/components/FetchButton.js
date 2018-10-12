import React from 'react';
import { Button } from 'react-bootstrap';

const FetchButton = ({ getValidationState, fetchCost }) =>
	<Button
		bsStyle="primary"
		disabled={getValidationState() === 'error'}
		onClick={fetchCost}
	>
		Calculate
	</Button>

export default FetchButton;