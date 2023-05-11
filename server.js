const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
const PORT = 4000
app.use(cors())

app.get('/',(req,res)=>{
    res.send('api is live')
})

const server = app.listen(PORT,()=> console.log(`alive on ${PORT}`))

const io = new Server(server)

io.on('connection', (socket)=>{
    console.log('A user connected!')
    socket.on('join-user',({name, id})=>{
        console.log({name, id})
        socket.join(id)
        socket.to(id).emit('user-joined',name)
    })
})
