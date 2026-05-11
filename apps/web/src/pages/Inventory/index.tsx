import { Link } from 'react-router'

import { capitalize } from '@utils/string'
import './Inventory.scss'

const Inventory = () => {
    const categories = ['Périphériques', 'Affichage', 'Accessoires', 'Périphériques']
    const page_count = 10

    type ProductType = {
        id: string
        name: string
        sku: string
        category: string
        quantity: number
        threshold: number
        basePrice: string
        status: 'available' | 'alert' | 'out-of-stock'
    }
    const inventory: {
        total: number
        currentIndex: number
        products: ProductType[]
    } = {
        total: 100,
        currentIndex: 3,
        products: [
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'out-of-stock',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'alert',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'alert',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'available',
            },
            {
                id: '1',
                name: 'Clavier Mécanique RGB',
                sku: 'KBD-MECH-01',
                category: 'Périphériques',
                quantity: 5,
                threshold: 10,
                basePrice: '89.99',
                status: 'alert',
            },
        ],
    }

    const statusProductMap = {
        available: {
            badge: 'success',
            label: 'Disponible',
        },
        alert: {
            badge: 'warning',
            label: 'En alerte',
        },
        'out-of-stock': {
            badge: 'danger',
            label: 'En rupture',
        },
    }

    return (
        <div id="inventory">
            <div className="header">
                <h1 className="header__title">Inventaires</h1>
                <div className="header__controls">
                    <Link to="/products/add" className="header__controls__button button secondary with-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                        </svg>
                        <span>Ajouter un produit</span>
                    </Link>
                </div>
            </div>
            <div className="main-content">
                <div className="filter-bar">
                    <select name="product-category" id="product-category">
                        <option value="" selected>
                            Filtrer par categorie
                        </option>
                        {categories.map((category) => (
                            <option value={category}>{capitalize(category)}</option>
                        ))}
                    </select>
                    <select name="product-status" id="product-status">
                        <option value="" selected>
                            Filtrer par statut
                        </option>
                        <option value="available">Disponible</option>
                        <option value="alerte">Arlete</option>
                        <option value="out-of-stock">En rupture</option>
                    </select>
                    <button className="secondary with-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
                        </svg>
                        Réénitialiser les filtre
                    </button>
                </div>
                <div className="pagination">
                    <Link to="?page=1" className="button with-icon primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                            className="icon"
                        >
                            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                        </svg>
                        <span>Précédent</span>
                    </Link>
                    <input type="text" min={1} max={page_count} value={1} className="pagination__current-index" />
                    <Link to="?page=2" className="button with-icon primary">
                        <span>Suivant</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                            className="icon"
                        >
                            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                        </svg>
                    </Link>
                </div>
                {/* tableau */}
                <div className="inventory">
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>SKU</th>
                                <th>Catégorie</th>
                                <th>Quantité</th>
                                <th>Seuil</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.products.map((product) => (
                                <tr>
                                    <td>
                                        <Link
                                            to={`/inventory/${product.id}`}
                                            className={statusProductMap[product.status].badge}
                                        >
                                            {product.name}
                                        </Link>
                                    </td>
                                    <td>{product.sku}</td>
                                    <td>{product.category}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.threshold}</td>
                                    <td>
                                        <span className={`badge ${statusProductMap[product.status].badge}`}>
                                            {statusProductMap[product.status].label}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Inventory
