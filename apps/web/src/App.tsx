import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import Dashboard from '@pages/Dashboard'
import Inventory from '@pages/Inventory'
import Supply from '@pages/Supply'
import Root from '@layout/Root'

import ProductPage from '@pages/ProductPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />}>
                    <Route index element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Inventory />} />
                    <Route path="/products/add" element={<ProductPage mode="creating" />} />
                    <Route path="/products/:id" element={<ProductPage mode="edition" />} />
                    <Route path="/orders" element={<Supply />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
