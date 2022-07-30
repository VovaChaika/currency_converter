import React, {useEffect} from 'react';
import styles from "./Header.module.css"
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css"

const Header = (props) => {
    useEffect(()=>{},[props.amountEUR])
    return (
        <div className={styles.header}>
            <div>Курс долара / євро</div>
            <div>EUR - {props.amountEUR}</div>
            <div>USD - {props.amountUSD}</div>

            <Button variant="primary" onClick={props.updateAmount}>Оновити актуальний курс</Button>

            <span>Гривня до інших валют: </span>
            <span>UAH/

                <select value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)}>
                {props.currencies.map(currency =>
                    (<option key={currency} value={currency}>{currency}</option>)
                )}
                </select>

                - {props.amount}
            </span>
        </div>
    );
};

export default Header;