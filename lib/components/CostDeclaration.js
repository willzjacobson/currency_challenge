import React from 'react';
import { Button } from 'react-bootstrap';


const CostDeclaration = ({ totalCost }) =>
	typeof totalCost === 'number' ?
		<h3>Cost will be ${totalCost}</h3> :
		null;


export default CostDeclaration;
