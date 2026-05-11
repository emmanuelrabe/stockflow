import dotenv from 'dotenv'

export type NodeEnvType = 'production' | 'development' | 'test'

const nodeEnv = (process.env.NODE_ENV || 'development') as NodeEnvType

dotenv.config()

export const envConfig = {
    // NODE SERVER
    NODE_ENV: nodeEnv,
    PORT: process.env.PORT,

    // DATA BASE
    DATABASE_URL: process.env.DATABASE_URL,
}
