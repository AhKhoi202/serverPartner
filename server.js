import express from 'express'
require('dotenv').config()
import cors from 'cors'
import initRoutes from './src/routes'
import connectDatabase from './src/config/connectDatabase'

const app = express() 
app.use(cors({
    // origin:process.env.CLIENT_URL,
    origin:'*',
    methods: ["POST", "GET", "PUT", "DELETE"]
}))
//đọc dữ liệu đc gửi lên từ client
app.use(express.json({ limit: '50mb' }));
//đọc data gửi từ client dạng form data
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//=> đọc dữ liệu của api từ client gửi lên

initRoutes(app)
connectDatabase()

const port = process.env.PORT || 8888
const listener = app.listen(port, () => {
    console.log(`server ís running on the port ${listener.address().port}`)
})