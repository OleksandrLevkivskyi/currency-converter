import './App.css';
import CurrencyInput from './components/CurrencyInput/CurrencyInput';
import {useState, useEffect} from "react";
import axios from 'axios';
import Header from './components/Header/Header';
import Spinner from './components/Spinner/Spinner';

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('UAH');
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUSD, setCurrentUSD] = useState('');
  const [currentEUR, setCurrentEUR] = useState('');

  function format(number) {
    return number.toFixed(2);
  }

  useEffect(()=>{
    setLoading(true);
    axios.get('https://api.apilayer.com/fixer/latest?apikey=vGCiHTLcQfHZ04CldvDQFYO3NSSCLRqu')
    .then(response => {
      setRates(response.data.rates);
      setCurrentUSD(format(response.data.rates.UAH / response.data.rates.USD));
      setCurrentEUR(format(response.data.rates.UAH / response.data.rates.EUR))
      setTimeout(() => {
        setLoading(false);
    }, 500);
    })
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);

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

  return (
    <div className="App">
      {loading 
        ? (<Spinner size={120} />) 
        : (<div>
              <Header 
                currentUSD={currentUSD}
                currentEUR={currentEUR}/>
              <h2>Конвертер валют</h2>
                <CurrencyInput 
                  onAmountChange={handleAmount1Change}
                  onCurrencyChange={handleCurrency1Change}
                  currencies={Object.keys(rates)} 
                  amount={amount1} 
                  currency={currency1}/>
                <CurrencyInput 
                  onAmountChange={handleAmount2Change}
                  onCurrencyChange={handleCurrency2Change}
                  currencies={Object.keys(rates)} 
                  amount={amount2} 
                  currency={currency2}/>
                </div>
          )}      
    </div>
  );
}

export default App;
