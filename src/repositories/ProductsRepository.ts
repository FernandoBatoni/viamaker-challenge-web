
import { IProduct } from "../app/Products/productsInterfaces"
import api from "../services/api"
import { Repository } from "./Repository"

class ProductsRepository extends Repository<IProduct> {}

export default new ProductsRepository({ path: '/produtos', api })
