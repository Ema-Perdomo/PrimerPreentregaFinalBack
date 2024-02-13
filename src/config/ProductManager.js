// Le doy el alias fs al modulo promises con as(palabra reservada)
import { promises as fs } from 'fs'

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    //Añado un producto
    async addProduct(producto) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if (producto.title && producto.description &&
            producto.price && producto.code &&
            producto.stock) {
            const code = products.findIndex((p) => p.code === producto.code)
            if (code === -1) {
                producto.id = crypto.randomBytes(10).toString("hex");  //No se si iba acá, esta en Product.js 
                producto.status = true 
                if (!producto.thumbnail) {    //No se si va este if
                    producto.thumbnail = []
                }
                products.push(producto)
                await fs.writeFile(this.path, JSON.stringify(products))
                return('Producto creado correctamente')
            } else {
                console.log("Este producto ya existe.")
            }
        } else {
            console.log("Complete todos los campos!")

        }
    }

    //Traigo productos
    async getProducts() {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return products
    }

    //Traigo un producto segun su id
    async getProductsById(id) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = products.find((p) => p.id === id)
        if (prod) {
            return prod
        } else {
            return null
        }

    }
    //Actualizo un producto
    async updateProduct(id, nuevoProducto) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex((p) => p.id == id)
        if (indice != -1) {
            products[indice].stock = nuevoProducto.stock;
            products[indice].price = nuevoProducto.price;
            products[indice].title = nuevoProducto.title;
            products[indice].thumbnail = nuevoProducto.thumbnail;
            products[indice].description = nuevoProducto.description;
            products[indice].code = nuevoProducto.code;
            await fs.writeFile(this.path, JSON.stringify(products))
            console.log('Producto actualizado')
        } else {
            console.log("404: Not Found")
        }
    }
    //Elimino producto dado su Id
    async deleteProduct(id) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex((p) => p.id === id);
        if (indice != -1) {
            const productosFiltrados = products.filter((p) => p.id != id);
            await fs.writeFile(this.path, JSON.stringify(productosFiltrados))
            console.log('Producto eliminado')
        } else {
            console.log("404: Not Found")
        }
    }
}



// class ProductManager {
//     constructor() {
//         this.products = [];
//     }
//     //Valida code unico, campos obligatorios y crea con id automentable
//     addProduct(producto) {
//         if (producto.title && producto.description &&
//             producto.price && producto.thumbnail && producto.code &&
//             producto.stock) {
//             const code = this.products.findIndex((p) => p.code === producto.code)
//             if (code === -1) {
//                 producto.id = crypto.randomBytes(10).toString("hex");
//                 this.products.push(producto);
//             }else{
//                 console.log("Este producto ya existe.")
//             }
//         } else {
//             console.log("Complete todos los campos!")

//         }
//     }
//     //Devolver todos los productos creados
//     getProducts() {
//         console.log this.products;
//     }
//     getProductById(id) {
//         const prod = this.products.find((p)=> p.id == id);
//         //(this.products.id)
//         if (prod) {
//             console.log prod
//         }else{
//             console.log("404: Not Found")
//         }
//         // console.log this.products.filter((id) => products.id === id);
//     }
// };
