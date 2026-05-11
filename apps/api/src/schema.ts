import { start } from 'node:repl'
import z from 'zod/v4'
import { OrderStatus } from './generated/prisma/enums'

// Zod Schemas
export const createProductSchema = z.object({
    sku: z.string().optional(),
    name: z.string(),
    category: z.string(),
    unitPrice: z.string(),
    stock: z.int(),
    minThreshold: z.int(),
})

export const updateProductSchema = createProductSchema.omit({ sku: true }).partial()

export const updateProductStockSchema = updateProductSchema.pick({ stock: true })

export const createOrderSchema = z.object({
    supplier: z.string(),
    supplierContact: z.string(),
    status: z.enum(OrderStatus).optional(),
    expectedDeliveryDate: z.iso.date(),
    items: z
        .object({
            productId: z.int(),
            quantity: z.int(),
            unitPrice: z.string(),
        })
        .array()
        .min(1),
})

export const updateOrderStatusSchema = z.object({
    status: z.enum(OrderStatus),
})

// Zod Types
export type CreateProductRequest = z.infer<typeof createProductSchema>
export type UpdateProductRequest = z.infer<typeof updateProductSchema>
export type UpdateProductStockRequest = z.infer<typeof updateProductStockSchema>
export type CreateOrderRequest = z.infer<typeof createOrderSchema>
export type UpdateOrderStatusRequest = z.infer<typeof updateOrderStatusSchema>
