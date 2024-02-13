import express from 'express';
import cartRouter from '../routes/cartRouter.js';
import productsRouter from './routes/productsRouter.js'
import upload from './config/multer.js'
import { __dirname } from './path.js'

//Config
const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())//Permite poder ejecutar JSON
app.use('/static', express.static(__dirname + '/public'))

//Router
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.post('/upload', upload.single('product'), (req, res) => {

    try {
        console.log(req.file)
        console.log(req.body)//?
        res.status(200).send('Imagen subida correctamente')
    } catch (error) {
        res.status(500).send('Error al cargar la imagen.')
    }
})

//Server
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})


//---------------------------------------








