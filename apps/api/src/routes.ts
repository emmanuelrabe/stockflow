import { Router } from 'express'

import * as controller from './controllers'
import { validateRequest } from './middlewares'
import * as schema from './schema'

// Initializing the router.
const router = Router()

router.get('/dashboard', controller.getStatistics)

router.post('/products', validateRequest({ body: schema.createProductSchema }), controller.addProduct)

router.get('/products', controller.getProducts)

router.get('/products/:id', controller.getProduct)

router.put('/products/:id', validateRequest({ body: schema.updateProductSchema }), controller.updateProdcut)

router.patch(
    '/products/:id/stock',
    validateRequest({ body: schema.updateProductStockSchema }),
    controller.updateProdcutStock
)

router.delete('/products/:id/', controller.deleteProduct)

// orders
router.post('/orders', validateRequest({ body: schema.createOrderSchema }), controller.order)

router.get('/orders', controller.getOrders)

router.get('/orders/:id', controller.getOrder)

router.patch(
    '/orders/:id/status',
    validateRequest({ body: schema.updateOrderStatusSchema }),
    controller.updateOrderStatus
)

router.delete('/orders/:id', controller.deleteOrder)

export default router
