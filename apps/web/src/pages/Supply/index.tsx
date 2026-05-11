import { Link } from 'react-router'

import './Supply.scss'

const Supply = () => {
    const page_count = 10

    type OrderType = {
        id: string
        product: string
        supplier: string
        quantity: number
        purchasePrice: string
        deliveryDate: Date
        status: 'pending' | 'confirmed' | 'delivered' | 'canceled'
    }

    const orders: OrderType[] = [
        {
            id: 'PO-2026-001',
            product: 'Clavier Mécanique RGB',
            supplier: 'TechLogix Corp',
            quantity: 50,
            purchasePrice: '45.00',
            deliveryDate: new Date('2026-05-15'),
            status: 'delivered',
        },
        {
            id: 'PO-2026-001',
            product: 'Clavier Mécanique RGB',
            supplier: 'TechLogix Corp',
            quantity: 50,
            purchasePrice: '45.00',
            deliveryDate: new Date('2026-05-09'),
            status: 'canceled',
        },
        {
            id: 'PO-2026-001',
            product: 'Clavier Mécanique RGB',
            supplier: 'TechLogix Corp',
            quantity: 50,
            purchasePrice: '45.00',
            deliveryDate: new Date('2026-05-15'),
            status: 'pending',
        },
    ]

    const statusOrderMap = {
        pending: {
            badge: 'info',
            label: 'En attente',
        },
        canceled: {
            badge: 'danger',
            label: 'Annulée',
        },
        confirmed: {
            badge: 'success',
            label: 'Confirmée',
        },
        delivered: {
            badge: 'success',
            label: 'Livrée',
        },
    }

    return (
        <div id="supply">
            <div className="header">
                <h1 className="header__title">Approvisionnement</h1>
                <div className="header__controls">
                    <Link to="/order/add" className="header__controls__button button secondary with-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93ZM320-320v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T663-540L443-320H320Zm300-263-37-37 37 37ZM380-380h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
                        </svg>
                        <span>Commander</span>
                    </Link>
                </div>
            </div>
            <div className="main-content">
                <div className="filter-bar">
                    <select name="product-status" id="product-status">
                        <option value="" selected>
                            Filtrer par statut
                        </option>
                        <option value="pending">En attente</option>
                        <option value="cancelled">Annulée</option>
                        <option value="confirmed">Confirmée</option>
                        <option value="delivered">Livrée</option>
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
                                <th>Fournisseur</th>
                                <th>Date de livraison</th>
                                <th>Statut</th>
                                <th>Nombre de produits</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr>
                                    <td>{order.supplier}</td>
                                    <td>
                                        <span>{order.deliveryDate.toDateString()}</span>
                                        {order.deliveryDate < new Date() && (
                                            <span className="badge danger">En retard</span>
                                        )}
                                    </td>
                                    <td>{order.status}</td>
                                    <td>
                                        <span className={`badge ${statusOrderMap[order.status].badge}`}>
                                            {statusOrderMap[order.status].label}
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

export default Supply
