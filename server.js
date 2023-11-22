import express from 'express'
require('dotenv').config()
import cors from 'cors'
import initRoutes from './src/routes'
import connectDatabase from './src/config/connectDatabase'

const app = express() 
app.use(cors({
    origin:process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"]
}))
app.use(express.json()) //đọc dữ liệu đc gửi lên từ client
app.use(express.urlencoded({extended:true})) //đọc data gửi từ client dạng form data
//=> đọc dữ liệu của api từ client gửi lên

initRoutes(app)
connectDatabase()



const port = process.env.PORT || 8888
const listener = app.listen(port, () => {
    console.log(`server ís running on the port ${listener.address().port}`)
})