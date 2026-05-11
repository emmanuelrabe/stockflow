/**
 * @class ApiError
 * @augments {Error}
 * @description Custom error class used to handle HTTP errors
 * and predictable application errors.
 * It allows you to standardize the response sent to the client (statusCode, message).
 */
export class ApiError extends Error {
    statusCode: number
    isOperational: boolean
    details?: any

    /**
     * Crée une instance de ApiError.
     * @constructor
     * @param {number} statusCode Le code de statut HTTP de l'erreur.
     * @param {string} message Le message d'erreur (souvent traduit via i18n).
     * @param {boolean} [isOperational=true] Indique si l'erreur est opérationnelle (prévisible).
     * @param {any} [details] Détails supplémentaires de l'erreur.
     */
    constructor(statusCode: number, message: string, isOperational: boolean = true, details?: any) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = isOperational
        this.details = details

        // Allows you to capture the stack trace correctly in Node.js
        Error.captureStackTrace(this, this.constructor)
    }
}
