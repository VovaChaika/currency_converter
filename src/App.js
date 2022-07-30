import './App.css';
import Header from "./components/Header";
import CurrencyConverter from "./components/CurrencyConverter";
import {useEffect, useState} from "react";
import axios from "axios";
import {instance} from "./api/api";
import Footer from "./components/Footer";


function App() {
    //header
    const [amountUSD, setAmountUSD] = useState(1);
    const [amountH, setAmountH] = useState(1);
    const [amountEUR, setAmountEUR] = useState(1);
    const [currencyH, setCurrencyH] = useState('EUR');
    //content
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState('BTC');
    const [currency2, setCurrency2] = useState('CAD');

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
                setAmountH(format(rates['UAH'] / rates[currencyH]));
                setAmountUSD(format(rates['UAH'] / rates["USD"]));
                setAmountEUR(format(rates['UAH'] / rates["EUR"]))
                setCurrencyH(currencyH);
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

    //////////////////////////////////////////////////// HEADER FUNC

    function headerCurrencyChange(currency2h) {
        setAmountH(format(rates['UAH'] / rates[currency2h]));
        setCurrencyH(currency2h);
    }

    function updateAmount() {
        setAmountEUR(format(rates['UAH'] / rates['EUR']));
        setAmountUSD(format(rates['UAH'] / rates['USD']));
        console.log("new: "+amountUSD+", "+amountEUR)
    }


    return (
        <div className="App">
            <Header
                onCurrencyChange={headerCurrencyChange}
                amount={amountH}
                amountUSD={amountUSD}
                amountEUR={amountEUR}
                updateAmount={updateAmount}
                currencies={Object.keys(rates)}
                currency={currencyH}/>
            <CurrencyConverter
                onAmountChange={[handleAmount1Change, handleAmount2Change]}
                onCurrencyChange={[handleCurrency1Change, handleCurrency2Change]}
                currencies={Object.keys(rates)}
                amount={[amount1, amount2]}
                currency={[currency1, currency2]}></CurrencyConverter>
            <Footer/>
        </div>
    );
}

export default App;
