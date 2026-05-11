import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod/v4'

import { envConfig } from './config'
import { ApiError } from './libs'

/**
 * @function errorHandler
 * @description Global error handling middleware for Express applications.
 * It standardizes the HTTP error response sent to the client and handles logging.
 * It distinguishes between two types of errors:
 * 1. Operational errors (ApiError.isOperational=true): Expected errors (4xx). The message is displayed.
 * 2. System/programmatic errors (bugs, isOperational=false): Unexpected errors (500). The message is hidden for security reasons.
 * @param {any} err The error object passed via next(err).
 * @param {Request} req The object of the HTTP request.
 * @param {Response} res The object of the HTTP response.
 * @param {NextFunction} next The next middleware (not used in a final handler).
 * @returns {Response} A standardized JSON error response.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode
    let message = err.message

    // Handling Unexpected Programming Errors
    if (!(err instanceof ApiError) || !err.isOperational) {
        console.error(`SERVER ERROR: ${err}`)

        // Replace the error message for security reasons
        statusCode = 500
        message = 'Une erreur serveur est survenue.'
    }

    const responsePayload: any = {
        status: 'error',
        message: message,
    }

    // Include details ONLY if the error has them (ApiError.details is non-null)
    // AND if it is a client error (4xx) or in development mode.
    if (err.details && statusCode >= 400 && statusCode < 500) {
        responsePayload.details = err.details
    }

    // Add the stack trace in development
    if (envConfig.NODE_ENV === 'development') {
        responsePayload.stack = err.stack
    }

    return res.status(statusCode).json(responsePayload)
}

interface ValidationSchemas {
    body?: ZodSchema
    query?: ZodSchema
    params?: ZodSchema
}

/**
 * @function validateRequest
 * @description Middleware for validating incoming data (body, query, params) based on a Zod schema.
 * @param schema The Zod schema to be used for validating the body of the request.
 * @returns The express middleware.
 */
export const validateRequest = (schemas: ValidationSchemas) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: any[] = []

        // Liste des cibles à valider
        const targets = ['body', 'query', 'params'] as const

        for (const target of targets) {
            const schema = schemas[target]
            if (schema) {
                // Validating user data with zod
                const result = schema.safeParse(req[target])

                // Validation failure management
                if (!result.success) {
                    // On accumule les erreurs de toutes les sources
                    errors.push(...result.error.issues)
                } else {
                    // On remplace par les données castées/transformées.
                    req[target] = result.data
                }
            }
        }

        // Si on a accumulé des erreurs, on lance l'ApiError
        if (errors.length > 0) {
            // Creates a standard operational error (400 Bad Request)
            const validationError = new ApiError(400, 'Échec de la validation du corps de la requete.', true, errors)

            // Delegates the error to the central error handler (errorHandler)
            return next(validationError)
        }

        // Continuation of the chain
        next()
    }
}
