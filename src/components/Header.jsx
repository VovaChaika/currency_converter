import React from 'react';
import styles from "./Header.module.css"

const Header = (props) => {
    const currencies = ["USD", "EUR"]

    return (
        <div className={styles.header}>
            <span>UAH/

                <select value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)}>
                {props.currencies.map(currency => (
                    <option value={currency}>{currency}</option>
                ))}
                </select>

                - {props.amount}
            </span>

            <div>EUR - {props.amountEUR}</div>
            <div>USD - {props.amountUSD}</div>

            <button onClick={props.updateAmount}>Update</button>


        </div>
    );
};

export default Header;