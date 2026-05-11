import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'

import { envConfig } from './config'
import { errorHandler } from './middlewares'
import { ApiError } from './libs'
import router from './routes'

// express main application
const app = express()

const isProd = envConfig.NODE_ENV === 'production'

// ---------- GLOBAL MIDDLEWARES ----------

// Parse JSON with a limit of 10 KB
app.use(express.json({ limit: '10kb' }))

// JSON parsing error interceptor
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // If the error comes from express.json() (SyntaxError on the body)
    if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
        return next(
            new ApiError(400, 'Le format JSON envoyé est invalide. Veuillez vérifier la syntaxe de votre requête.')
        )
    }
    next(err)
})

// Parse x-www-form-urlencoded data
app.use(express.urlencoded())

//
app.use(morgan('dev'))

// ---------- MAIN ROUTER (API Routes) ----------
app.use('/api', router)

// ---------- ERROR MANAGEMENT & 404 ----------

// Catch 404 (Route non trouvée)
app.use((req, res) => {
    res.status(404).json({ message: `Cannot find "${req.originalUrl}" on this server!` })
})

app.use(errorHandler)

export default app
