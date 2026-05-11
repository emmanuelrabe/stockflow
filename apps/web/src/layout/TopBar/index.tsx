import logo from '@assets/logo.png'
import './TopBar.scss'

const TopBar = () => {
    return (
        <div id="top-bar" className="top-bar">
            <div className="top-bar__brand">
                <img src={logo} className="top-bar__brand__logo" />
                <h1 className="top-bar__brand__name">StockFlow</h1>
            </div>
            <div className="top-bar__menu">
                <button className="top-bar__menu__button" onClick={() => {}}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                        className="top-bar__menu__button__icon"
                    >
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default TopBar
