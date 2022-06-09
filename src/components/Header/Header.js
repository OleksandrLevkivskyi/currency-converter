import './Header.css'

function Header(props) {
    return(
        <div className="header">
           <h1>Курс валют к гривне на {new Date().toLocaleDateString()}</h1>
           <pre>USD          {props.currentUSD}</pre>
           <pre>EUR          {props.currentEUR}</pre>
        </div>
    )
}

export default Header;