import { Request, Response, NextFunction } from 'express'
import db from './generated/client'
import { ApiError } from './libs'

import * as schema from './schema'
import { generateRandomSKU } from './utils'
import { OrderStatus } from './generated/prisma/enums'
import { tuple } from 'zod'

export async function getStatistics(req: Request, res: Response, next: NextFunction) {
    try {
        const totalProduct = await db.product.count()

        const okProducts = await db.$queryRaw`
            SELECT COUNT(*) as count 
            FROM products 
            WHERE stock > min_threshold
        `

        console.log(typeof okProducts)

        const onAlertProducts = await db.$queryRaw`
            SELECT COUNT(*) as count 
            FROM products 
            WHERE stock < min_threshold
        `

        const outOfStockProducts = await db.product.findMany({
            where: { stock: { equals: 0 } },
        })

        const totalInventoryValue = await db.product.aggregate({
            _sum: { unitPrice: true },
        })

        const mostUurgentAlerts = await db.$queryRaw`
            SELECT id, name, stock, min_threshold
            FROM products 
            WHERE stock < min_threshold
            ORDER BY min_threshold - stock DESC
            LIMIT 5
        `

        const pendinOrdersCount = await db.order.count({
            where: { status: 'pending' },
        })

        const lateOrdersCount = await db.order.count({
            where: {
                status: 'pending',
                expectedDeliveryDate: {
                    lt: new Date(),
                },
            },
        })

        const recentOrders = await db.$queryRaw`
            SELECT * 
            FROM products 
            WHERE stock < min_threshold
            ORDER BY created_at DESC
            LIMIT 3
        `

        const response = {
            summary: { totalProduct, okProducts, onAlertProducts, outOfStockProducts, totalInventoryValue },
            criticalAlerts: mostUurgentAlerts,
            pendinOrders: { total: pendinOrdersCount, onLate: lateOrdersCount },
            recentOrders,
        }

        console.log(response)

        res.status(200).json({})
    } catch (err) {
        next(err)
    }
}

export async function addProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as schema.CreateProductRequest

        let sku = data.sku

        if (!sku) {
            sku = generateRandomSKU()
        } else {
            const existingSku = await db.product.findFirst({ where: { sku: data.sku } })

            if (existingSku) {
                throw new ApiError(409, "L'Unité de Gestion de Stock (SKU) est déjà utilisé")
            }
        }

        const newProduct = await db.product.create({ data: { ...data, sku, storeId: 1 } })

        res.status(201).json({ newProduct })
    } catch (err) {
        next(err)
    }
}

export async function getProducts(req: Request, res: Response, next: NextFunction) {
    try {
        const { category, status, store_id } = req.query

        const products = await db.product.findMany({
            where: {
                category: category as string | undefined,
                status: status as string | undefined,
                storeId: parseInt(store_id as string) as number | undefined,
            },
        })

        res.status(200).json({ products })
    } catch (err) {
        next(err)
    }
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string

        const product = await db.product.findFirst({ where: { id: parseInt(id) } })
        if (!product) {
            throw new ApiError(404, 'Le produit est introuvable.')
        }

        res.status(200).json({ product })
    } catch (err) {
        next(err)
    }
}

export async function updateProdcut(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string
        const data = req.body as schema.UpdateProductRequest

        const product = await db.product.findFirst({ where: { id: parseInt(id) } })
        if (!product) {
            throw new ApiError(404, 'Le produit est introuvable.')
        }

        const updatedProduct = await db.product.update({
            where: { id: product.id },
            data,
        })

        res.status(200).json({ updatedProduct })
    } catch (err) {
        next(err)
    }
}

export async function updateProdcutStock(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string
        const { stock } = req.body as schema.UpdateProductStockRequest

        const product = await db.product.findFirst({ where: { id: parseInt(id) } })
        if (!product) {
            throw new ApiError(404, 'Le produit est introuvable.')
        }

        const updatedProduct = await db.product.update({
            where: { id: product.id },
            data: { stock },
        })

        res.status(200).json({ newStock: updatedProduct.stock })
    } catch (err) {
        next(err)
    }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string

        const product = await db.product.findFirst({ where: { id: parseInt(id) } })
        if (!product) {
            throw new ApiError(404, 'Le produit est introuvable.')
        }

        const existingSkuPendingOrder = await db.order.findFirst({
            where: {
                status: {
                    in: ['pending', 'confirmed'],
                },
                items: {
                    some: { productId: product.id },
                },
            },
        })
        if (existingSkuPendingOrder) {
            throw new ApiError(409, 'Impossible de supprimer ce produit il est référencé dans un commande encours.')
        }

        await db.product.delete({
            where: { id: product.id },
        })

        res.status(200)
    } catch (err) {
        next(err)
    }
}

export async function order(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as schema.CreateOrderRequest

        const productIds = data.items.map((item) => item.productId)
        let count = 0
        for (const id of productIds) {
            const existingProduct = await db.product.findFirst({ where: { id } })
            if (!existingProduct) count++
        }
        if (count) {
            throw new ApiError(
                404,
                `Impossible de valider la commande, ${count} produit${count && 's'} introuvable{count && 's'}.`
            )
        }

        const order = await db.order.create({
            data: {
                storeId: 1,
                ...data,
                items: {
                    create: data.items,
                },
            },
        })

        res.status(201).json({ order })
    } catch (err) {
        next(err)
    }
}

export async function getOrders(req: Request, res: Response, next: NextFunction) {
    try {
        const { supplier, status, store_id } = req.query

        const orders = await db.order.findMany({
            where: {
                supplier: supplier as string | undefined,
                status: status as OrderStatus | undefined,
                storeId: parseInt(store_id as string) as number | undefined,
            },
        })

        res.status(200).json({ orders })
    } catch (err) {
        next(err)
    }
}

export async function getOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string

        const order = await db.order.findFirst({
            where: {
                id: parseInt(id),
            },
            select: {
                supplier: true,
                supplierContact: true,
                status: true,
                expectedDeliveryDate: true,
                items: {
                    select: {
                        quantity: true,
                        unitPrice: true,
                        product: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        })
        if (!order) {
            throw new ApiError(404, 'La commande est introuvable.')
        }

        res.status(200).json({ order })
    } catch (err) {
        next(err)
    }
}

export async function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string
        const { status } = req.body as schema.UpdateOrderStatusRequest

        const order = await db.order.findFirst({ where: { id: parseInt(id) } })
        if (!order) {
            throw new ApiError(404, 'La commande est introuvable.')
        }

        if (
            (order.status === 'pending' && !['confirmed', 'canceled'].includes(status)) ||
            (order.status === 'confirmed' && !['delivered', 'canceled'].includes(status))
        ) {
            throw new ApiError(409, 'Impossible de modifier le status.')
        }

        const updateOrder = await db.order.update({
            where: { id: order.id },
            data: { status },
            select: {
                 items: true
            }
        })

        await db.product.updateMany({
            where: { 
                orderItems: { 
                    some: { 
                        orderId: order.id
                    }}
                },
            data: {
                stock: { increment: 1 }
            }
        })

        const updatedOrder = await db.order.update({
            where: { id: order.id },
            data: { status },
        })

        res.status(200).json({ newStatus: updatedOrder.status })
    } catch (err) {
        next(err)
    }
}

export async function deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string

        const order = await db.order.findFirst({ where: { id: parseInt(id) }})
        if (!order) {
            throw new ApiError(404, 'Le produit est introuvable.')
        }

        const isPendingOrder = await db.order.findFirst({
            where: {
                status: 'pending',
            }
        })
        if (isPendingOrder) {
            throw new ApiError(409, 'Impossible de supprimer cette commande,  il est en état d\'attente.')
        }

        await db.order.delete({
            where: { id: order.id },
        })

        res.status(200)
    } catch (err) {
        next(err)
    }
}
