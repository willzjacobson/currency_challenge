import React from 'react';

const CostDeclaration = ({ costInfo }) => {
  let content;

  if (costInfo.loading) content = '......';
  if (typeof costInfo.cost === 'number')
    content = `Cost will be ${costInfo.cost}`;
  if (costInfo.error) content = costInfo.error.message;

  return <h3>{content}</h3>;
};

export default CostDeclaration;
