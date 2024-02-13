import { Router } from 'express';
import { ProductManager  } from '../src/config/ProductManager.js';

const productManager = new ProductManager('./src/data/products.json')
const productsRouter = Router()


productsRouter.get('/products', async (req, res) => {

    try {
        const { limit } = req.query
        const prods = await productManager.getProducts()
        const limite = parseInt(limit)

        //NaN en If es false
        if (limite && limite > 0) {//Si el string es no numerico devuelve NaN
            const prodsLimit = prods.slice(0, limit) //Slice funciona con limit = undefined | "5" viene del query es = 5 en Js
            res.status(200).send(prodsLimit)
        } else {
            res.status(400).send("Error al consultar cliente, ingrese un número válido para las queries.")
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar productos: ${error}`)
    }
})

productsRouter.get('/products/:idProd', async (req, res) => {
    try {
        const idProducto = req.params.idProd
        const prod = await productManager.getProductsById(idProducto)
        if (prod)
            res.status(200).send(prod)
        else
            res.status(404).send("Producto inexistente.")
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar producto: ${error}`)
    }
})

productsRouter.post('/products', async (req, res) => {
    try {
        const product = req.body
        const mensaje = await productManager.addProduct(product)
        if (mensaje === 'Producto creado correctamente')
            res.status(200).send(mensaje)
        else
            res.status(400).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

productsRouter.put('/products/:idProd', async (req, res) => {
    try {
        const idProducto = req.params.idProd
        const updateProduct = req.body //Consulto body
        const mensaje = await productManager.updateProduct(idProducto, updateProduct)
        if (mensaje == 'Producto actualizado')
            res.status(200).send(mensaje)
        else
            res.status(404).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar producto: ${error}`)
    }
})

productsRouter.delete('/products/:idProd', async (req, res) => {
    try {
        const idProducto = req.params.idProd
        const mensaje = await productManager.deleteProduct(idProducto)
        if (mensaje == 'Producto eliminado')
            res.status(200).send(mensaje)
        else
            res.status(404).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar el producto: ${error}`)
    }
})

export default productsRouter