import { Link } from 'react-router'

import './ProductPage.scss'
type ProductPagePropsType = {
    mode: 'edition' | 'creating'
}

const ProductPage: React.FC<ProductPagePropsType> = ({ mode = 'creating' }) => {
    const product = {
        id: '1',
        name: 'Clavier Mécanique RGB',
        sku: 'KBD-MECH-01',
        category: 'Périphériques',
        quantity: 5,
        threshold: 10,
        basePrice: '89.99',
        status: 'available',
    }

    return (
        <div id="product-page">
            <div className="header">
                <h1 className="header__title">{mode === 'creating' ? 'Ajouter un produit' : 'Fiche produit'}</h1>
                <div className="header__controls">
                    <button className="header__controls__button secondary with-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM565-275q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
                        </svg>
                        <span>Enregistrer les modification</span>
                    </button>
                </div>
            </div>
            <div className="main-content">
                <ul className="breadcrumb">
                    <li className="breadcrumb__item">
                        <Link to="/products" className="breadcrumb__link">
                            Inventaire
                        </Link>
                    </li>
                    <li className="breadcrumb__item active">
                        {mode === 'creating' ? 'Ajouter un produit' : 'Nom du produit'}
                    </li>
                </ul>
                <form className="main-form" action="post">
                    <div className="name">
                        <label htmlFor="name">Nom du produit :</label>
                        {mode === 'creating' ? (
                            <input type="text" name="name" id="name" />
                        ) : (
                            <input type="text" name="name" id="name" value={product.name} />
                        )}
                    </div>
                    <div className="sku">
                        <label htmlFor="sku">SKU :</label>
                        {mode === 'creating' ? (
                            <input type="text" name="sku" id="sku" />
                        ) : (
                            <input type="text" name="sku" id="sku" value={product.sku} />
                        )}
                    </div>
                    <div className="category">
                        <label htmlFor="category">Catégorie du produit :</label>
                        {mode === 'creating' ? (
                            <select name="category" id="select-category">
                                <option value="">Sélectionner un catégorie</option>
                            </select>
                        ) : (
                            <select name="category" id="select-category" value={product.category}>
                                <option value="">Sélectionner un catégorie</option>
                            </select>
                        )}
                    </div>
                    <div className="unit-price">
                        <label htmlFor="unit-price">Prix unitaire :</label>
                        {mode === 'creating' ? (
                            <input type="number" min={1} name="unit-price" id="unit-price" />
                        ) : (
                            <input type="number" min={1} name="unit-price" id="unit-price" value={product.basePrice} />
                        )}
                    </div>
                    <div className="stock-quantity">
                        <label htmlFor="stock-quantity">Stock :</label>
                        {mode === 'creating' ? (
                            <input type="number" min={1} name="stock-quantity" id="stock-quantity" />
                        ) : (
                            <input
                                type="number"
                                min={1}
                                name="stock-quantity"
                                id="stock-quantity"
                                value={product.quantity}
                            />
                        )}
                    </div>
                    <div className="alert-threshold">
                        <label htmlFor="alert-threshold">Seuil :</label>
                        {mode === 'creating' ? (
                            <input type="number" min={0} name="alert-threshold" id="alert-threshold" />
                        ) : (
                            <input
                                type="number"
                                min={0}
                                name="alert-threshold"
                                id="alert-threshold"
                                value={product.threshold}
                            />
                        )}
                    </div>
                    {mode === 'creating' && (
                        <div className="save-product">
                            <button className="primary">Enregistrer le produit</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ProductPage
