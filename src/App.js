import './App.css';
import Header from "./components/Header";
import CurrencyConverter from "./components/CurrencyConverter";
import {useEffect, useState} from "react";
import axios from "axios";
import {instance} from "./api/api";


function App() {
    const [amount1h, setAmount1h] = useState(1);
    const [amount2h, setAmount2h] = useState(1);
    const [amount3h, setAmount3h] = useState(1);
    const [currency2h, setCurrency2h] = useState('EUR');

    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState('USD');
    const [currency2, setCurrency2] = useState('EUR');
    const [rates, setRates] = useState([]);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        instance.get('latest')
            .then(response => {
                setRates(response.data.rates);
            })
    }, []);

    useEffect(() => {
        if (!!rates) {
            function init() {
                setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
                setAmount1(amount1);
                setAmount2h(format(rates['UAH'] / rates[currency2h]));
                setAmount1h(format(rates['UAH'] / rates["USD"]));
                setAmount3h(format(rates['UAH'] / rates["EUR"]))
                setCurrency2h(currency2h);
            }
            init();
        }
    }, [rates]);



    function format(number) {
        return number.toFixed(4);
    }

    function handleAmount1Change(amount1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setCurrency1(currency1);
    }

    function handleAmount2Change(amount2) {
        setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
        setAmount2(amount2);
    }

    function handleCurrency2Change(currency2) {
        setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
        setCurrency2(currency2);
    }
////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

    function headerCurrencyChange(currency2h) {
        setAmount2h(format(rates['UAH'] / rates[currency2h]));
        setCurrency2h(currency2h);
    }

    function updateAmount() {
        setAmount3h(format(rates['UAH'] / rates["EUR"]));
        setAmount1h(format(rates['UAH'] / rates["USD"]));
    }


    return (
        <div className="App">
            <Header
                onCurrencyChange={headerCurrencyChange}
                amount={amount2h}
                amountUSD={amount1h}
                amountEUR={amount3h}
                updateAmount={updateAmount}
                currencies={Object.keys(rates)}
                currency={currency2h}/>
            <CurrencyConverter
                onAmountChange={[handleAmount1Change, handleAmount2Change]}
                onCurrencyChange={[handleCurrency1Change, handleCurrency2Change]}
                currencies={Object.keys(rates)}
                amount={[amount1, amount2]}
                currency={[currency1, currency2]}/>

        </div>
    );
}

export default App;
