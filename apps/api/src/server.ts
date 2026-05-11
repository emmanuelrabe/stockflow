import app from './app'
import { envConfig } from './config'

app.listen(envConfig.PORT, () => {
    console.log(`Server running at port ${envConfig.PORT}`)
})
