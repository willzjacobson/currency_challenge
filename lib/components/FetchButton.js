import React from 'react';
import { Button } from 'react-bootstrap';

const FetchButton = ({ getValidationState, handleClick }) => (
  <Button
    bsStyle="primary"
    disabled={getValidationState() === 'error'}
    onClick={handleClick}
  >
    Calculate
  </Button>
);

export default FetchButton;
