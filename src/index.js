import express from 'express';
import cartRouter from '../routes/CartRouter.js';
import { ProductManager } from './config/ProductManager.js'
import productsRouter from './routes/productsRouter.js'
import upload from './config/multer.js'
import { __dirname } from './path.js'

//Config
const app = express()
const PORT = 8080
const productManager = new ProductManager('./products.json')
app.use('/api/cart', cartRouter)

//3-Middlewares
//Permite poder ejecutar JSON
app.use(express.json())
app.use('/static', express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.send('Hola desde mi primer server en Express') //Enviame el sig. mensaje:
})
app.get('/products',async (req,res)=>{

    const {limit} = req.query
    const prods = await productManager.getProducts()
    const limite = parseInt(limit)

    //NaN en If es false
    if (limite) {//Si el string es no numerico devuelve NaN
        if (limite < 0) {
            res.send('Ingrese valor valido en los queries')
        } else{
            const prodsLimit = prods.slice(0, limit) //Slice funciona con limit = undefined | "5" viene del query es = 5 en Js
            res.send(prodsLimit)
        }
    } else {
        res.send(prods)
    }

    
})

app.get('/products/:idProd', async (req,res)=>{
    const idProducto = req.params.idProd
    const prod = await productManager.getProductsById(idProducto)
    
    res.send(prod)
})

app.listen(PORT,()=>{
    console.log(`Server on port: ${PORT}` )
})


//---------------------------------------





//4-Router
app.use('/api/products', productsRouter)
app.post('/upload', upload.single('product'), (req, res) => {

    try {
        console.log(req.file)
        console.log(req.body)
        res.status(200).send('Imagen subida correctamente')
    } catch (error) {
        res.status(500).send(`Error al catgar la imagen.`)
    }
})

//5-Server
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})
