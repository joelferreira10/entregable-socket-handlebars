import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import {Server} from 'socket.io'
import viewsRouter from './routes/views.route.js'
import ManagerProducts from './manager/managerProducts.js'
import morgan from 'morgan'

const manager=new ManagerProducts(__dirname+"/data/products.json")
const app = express()
const httpServer=app.listen(8080,()=>console.log("server ok,port 8080"))
export const socketServer=new Server(httpServer)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars',handlebars.engine())

app.set('views',__dirname+'/views')

app.set('view engine','handlebars')
app.use(express.static(__dirname+'/public'))

app.use('/',viewsRouter)

socketServer.on('connection',async(socket)=>{
    console.log(`"nuevo cliente conectado": ${socket.id}`)
    const products=await manager.getProducts()
    socketServer.emit('products',products)
    socket.on('newUser',async user=>{
        await manager.addProducts(user)
        console.log(user)
        socketServer.emit('products',products)
    })
    
    
    //socketServer.emit("products",await manager.getProducts())
    

    // socket.on('message',data=>{
    //     console.log(data)
    // })
    // socket.on('message2',data=>{
    //     console.log(data)
    // })
    // socket.on('messageid',data=>{
    //     console.log(data)
    // })
    // socket.emit("evento_para_socket_individual","el msj lo recibe el socket")
    // socket.broadcast.emit('evento_para_todos_menos_el_socket_actual','este evento lo veran todos los socket conectados menos el actual el emisor')

    // socketServer.emit('evento_para_todos','este msj lo recibe todos los socket conectados')
})
