import { Link } from 'react-router'
import './Dashboard.scss'

const Dashboard = () => {
    type CriticalAlrtProduct = {
        id: string
        name: string
        sku: string
        category: string
        quantity: number
        threshold: number
        base_price: string
        restocking: boolean
    }

    const criticalAlrtProducts: CriticalAlrtProduct[] = [
        {
            id: '1',
            name: 'Clavier Mécanique RGB',
            sku: 'KBD-MECH-01',
            category: 'Périphériques',
            quantity: 5,
            threshold: 10,
            base_price: '89.99',
            restocking: false,
        },
        {
            id: '2',
            name: 'Écran 27" 4K UHD',
            sku: 'MON-4K-27',
            category: 'Affichage',
            quantity: 1,
            threshold: 5,
            base_price: '349.00',
            restocking: true,
        },
        {
            id: '3',
            name: 'Câble USB-C Braisé (2m)',
            sku: 'CBL-USBC-02',
            category: 'Accessoires',
            quantity: 8,
            threshold: 15,
            base_price: '12.50',
            restocking: false,
        },
        {
            id: '4',
            name: 'Souris Sans Fil Ergonomique',
            sku: 'MSE-WRLS-05',
            category: 'Périphériques',
            quantity: 5,
            threshold: 10,
            base_price: '55.00',
            restocking: false,
        },
        {
            id: '5',
            name: 'Support Ordinateur Portable',
            sku: 'STN-LAP-ALU',
            category: 'Mobilier',
            quantity: 3,
            threshold: 5,
            base_price: '39.00',
            restocking: false,
        },
    ]

    const statusOrderBadgeMap = {
        pending: {
            badge: 'info',
            label: 'En attente',
        },
        confirmed: {
            badge: 'success',
            label: 'Confirmée',
        },
        delivered: {
            badge: 'success',
            label: 'Livrée',
        },
        canceled: {
            badge: 'danger',
            label: 'Annulée',
        },
    }

    type RecentOrders = {
        id: string
        product: string
        supplier: string
        quantity: number
        purchasePrice: string
        deliveryDate: Date
        status: 'pending' | 'confirmed' | 'delivered' | 'canceled'
    }

    const recentOrders: RecentOrders[] = [
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
            id: 'PO-2026-002',
            product: 'Écran 27" 4K UHD',
            supplier: 'DisplayVision Ltd',
            quantity: 15,
            purchasePrice: '210.00',
            deliveryDate: new Date('2026-05-22'),
            status: 'pending',
        },
        {
            id: 'PO-2026-003',
            product: 'Câble USB-C Braisé',
            supplier: 'CableMaster',
            quantity: 200,
            purchasePrice: '3.50',
            deliveryDate: new Date('2026-05-10'),
            status: 'canceled',
        },
    ]

    return (
        <div id="dashboard">
            <div className="header">
                <h1 className="header__title">Tableau de bord</h1>
                <div className="header__controls">
                    <button className="header__controls__button secondary with-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
                        </svg>
                        <span>Rafraichir</span>
                    </button>
                </div>
            </div>
            <div className="main-content">
                <div className="inventory-overview">
                    <div className="inventory-overview__card total-quantity">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                            className="inventory-overview__card__icon"
                        >
                            <path d="M200-80q-33 0-56.5-23.5T120-160v-451q-18-11-29-28.5T80-680v-120q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v120q0 23-11 40.5T840-611v451q0 33-23.5 56.5T760-80H200Zm0-520v440h560v-440H200Zm-40-80h640v-120H160v120Zm200 280h240v-80H360v80Zm120 20Z" />
                        </svg>
                        <p className="inventory-overview__card__value">{10}</p>
                        <h3 className="inventory-overview__card__title">Total produits</h3>
                        <Link to="/inventory" className="inventory-overview__card__link">
                            Voir l'inventaire
                        </Link>
                    </div>
                    <div className="inventory-overview__card on-alert">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                            className="inventory-overview__card__icon"
                        >
                            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                        </svg>
                        <p className="inventory-overview__card__value">
                            <span>{5}</span>
                            <span className="badge warning">seuil atteint</span>
                        </p>
                        <h3 className="inventory-overview__card__title">Produits en alerte</h3>
                        <Link to="/inventory?on-alerte=true" className="inventory-overview__card__link">
                            Voir les produits en alerte
                        </Link>
                    </div>
                    <div className="inventory-overview__card out-of-stock">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                            className="inventory-overview__card__icon"
                        >
                            <path d="M451.5-591.5Q440-603 440-620t11.5-28.5Q463-660 480-660t28.5 11.5Q520-637 520-620t-11.5 28.5Q497-580 480-580t-28.5-11.5ZM440-720v-200h80v200h-80ZM223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
                        </svg>
                        <p className="inventory-overview__card__value">
                            <span>{0}</span>
                            <span className="badge success">aucun rupture</span>
                        </p>
                        <h3 className="inventory-overview__card__title">Produits en rupture</h3>
                        <Link to="/inventory?out-of-stock=true" className="inventory-overview__card__link">
                            Voir les produits en rupture
                        </Link>
                    </div>
                    <div className="inventory-overview__card inventory-value">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                            className="inventory-overview__card__icon"
                        >
                            <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
                        </svg>
                        <p className="inventory-overview__card__value">FCFA {516000}</p>
                        <h3 className="inventory-overview__card__title">Valeur total du stock</h3>
                    </div>
                </div>
                <div className="critical-alerts">
                    <h2 className="critical-alerts__heading">Alertes critiques</h2>
                    <div className="critical-alerts__content">
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
                                {criticalAlrtProducts.map((product) => (
                                    <tr>
                                        <td>
                                            <Link to={`/inventory/${product.id}`}>{product.name}</Link>
                                        </td>
                                        <td>{product.sku}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <span>{product.quantity}</span>
                                                {product.restocking && (
                                                    <span className="badge success">en restockage</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>{product.threshold}</td>
                                        <td>
                                            <span className="badge danger">en rupture</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="orders-overview">
                    <div className="pending-orders">
                        <div className="pending-orders__card on-alert">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="currentColor"
                                className="pending-orders__card__icon"
                            >
                                <path d="M640-640h120-120Zm-440 0h338-18 14-334Zm16-80h528l-34-40H250l-34 40Zm184 270 80-40 80 40v-190H400v190Zm182 330H200q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v196q-19-7-39-11t-41-4v-122H640v153q-35 20-61 49.5T538-371l-58-29-160 80v-320H200v440h334q8 23 20 43t28 37Zm138 0v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z" />
                            </svg>
                            <p className="pending-orders__card__value">
                                <span>{10}</span>
                                <span className="badge danger">{3} retard de livraison</span>
                            </p>
                            <h3 className="pending-orders__card__title">Commande en cours</h3>
                            <Link to="/inventory?on-alerte=true" className="inventory-overview__card__link">
                                Voir les commandes
                            </Link>
                        </div>
                    </div>
                    <div className="recent-orders">
                        <h2 className="recent-orders__heading">Commandes récentes</h2>
                        <div className="recent-orders__content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fournisseur</th>
                                        <th>Statut</th>
                                        <th>Date de livraison</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr>
                                            <td>{order.supplier}</td>
                                            <td>
                                                <span className={`badge ${statusOrderBadgeMap[order.status].badge}`}>
                                                    {statusOrderBadgeMap[order.status].label}
                                                </span>
                                            </td>
                                            <td>{order.deliveryDate.toDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
