/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Request, Response } from 'express'
import router from './routes'
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola')
})

router(app)

// app.use(function(err: { status: number }, req: Request, res: Response, next: any) {
//   res.status(err.status || 500)
//   res.json({ statusCode: err.status || 500, message: err })
// })

const appUrl = process.env.APP_URL
app.listen(port, () => console.log(`Listen ${appUrl}`))

export default app
