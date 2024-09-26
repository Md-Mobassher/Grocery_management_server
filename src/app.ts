import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cookieParser())

// cors
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://groca-grocery.web.app'],
    credentials: true,
  }),
)

// application routes
app.use('/api/v1', router)

// test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hi Next Level Developer !')
})

// global error handler
app.use(globalErrorHandler)

// Not Found
app.use(notFound)

export default app
