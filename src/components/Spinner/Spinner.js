import spinner from '../../images/small-spinner.svg'

const Spinner = ({ size }) => {
    return (
        <div className="spinner">
            <img src={spinner} style={{width: size, height: size, position: 'absolute', top: '50%', left: '50%', marginRight:'-50%', transform: 'translate(-50%, -50%)'}} alt="spinner" />
        </div>
    )
}

export default Spinner