
import { IProduct } from "../app/Products/productsInterfaces"
import api from "../services/api"
import { Repository } from "./Repository"

class ProductsRepository extends Repository<IProduct[], IProduct, IProduct[], IProduct> {}

export default new ProductsRepository({ path: '/products', api })
