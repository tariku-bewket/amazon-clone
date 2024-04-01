import React from 'react';
import classes from './currencyFormatter.module.css';

function CurrencyFormat({ amount }) {
  return (
    <div className={classes.amount}>
      <p>${amount}</p>
    </div>
  );
}

export default CurrencyFormat;
