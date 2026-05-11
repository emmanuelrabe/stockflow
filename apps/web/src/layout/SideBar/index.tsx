import { NavLink } from 'react-router'

import logo from '@assets/logo.png'
import './SideBar.scss'

const SideBar = () => {
    return (
        <div id="side-bar" className="side-bar">
            <div className="side-bar__brand">
                <img src={logo} className="side-bar__brand__logo" />
                <h1 className="side-bar__brand__name">StockFlow</h1>
            </div>
            <div className="side-bar__menu">
                <ul className="side-bar__menu__nav">
                    <li className="side-bar__menu__nav__item">
                        <NavLink to="/dashboard" className="side-bar__menu__nav__item__link">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="currentColor"
                            >
                                <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
                            </svg>
                            <span>Tableau de bord</span>
                        </NavLink>
                    </li>
                    <li className="side-bar__menu__nav__item">
                        <NavLink to="/products" className="side-bar__menu__nav__item__link ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="currentColor"
                            >
                                <path d="M620-163 450-333l56-56 114 114 226-226 56 56-282 282Zm220-397h-80v-200h-80v120H280v-120h-80v560h240v80H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v200ZM508.5-771.5Q520-783 520-800t-11.5-28.5Q497-840 480-840t-28.5 11.5Q440-817 440-800t11.5 28.5Q463-760 480-760t28.5-11.5Z" />
                            </svg>
                            <span>Inventaires</span>
                        </NavLink>
                    </li>
                    <li className="side-bar__menu__nav__item">
                        <NavLink to="/orders" className="side-bar__menu__nav__item__link">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="currentColor"
                            >
                                <path d="M160-200h80v-320h480v320h80v-426L480-754 160-626v426Zm-80 80v-560l400-160 400 160v560H640v-320H320v320H80Zm280 0v-80h80v80h-80Zm80-120v-80h80v80h-80Zm80 120v-80h80v80h-80ZM240-520h480-480Z" />
                            </svg>
                            <span>Approvisionnement</span>
                        </NavLink>
                    </li>
                </ul>
                <div className="side-bar__menu__footer">
                    <button className="side-bar__menu__footer__button with-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                            className="side-bar__menu__footer__link__icon"
                        >
                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                        </svg>
                        <span>Se déconecter</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBar
