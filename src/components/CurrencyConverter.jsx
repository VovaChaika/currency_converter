import React from 'react';
import styles from './CurrencyConverter.module.css'

const CurrencyConverter = (props) => {
    return (
        <div className={styles.body}>
            <input type="text" value={props.amount[0]} onChange={ev => props.onAmountChange[0](ev.target.value)}/>
            <select value={props.currency[0]} onChange={ev => props.onCurrencyChange[0](ev.target.value)}>
                {props.currencies.map((currency => (
                    <option key={currency} value={currency}>{currency}</option>
                )))}
            </select>

            <input type="text" value={props.amount[1]} onChange={ev => props.onAmountChange[1](ev.target.value)}/>
            <select value={props.currency[1]} onChange={ev => props.onCurrencyChange[1](ev.target.value)}>
                {props.currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>
        </div>
    );
};

export default CurrencyConverter;