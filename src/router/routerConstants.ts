import { IRoute } from "../interfaces/IRoute"

interface IRouterConstant {
  [key: string]: IRoute
}

const MAINROUTES: IRouterConstant = {
  HOME: { path: '/', name: 'Início' },
  PRODUCTS: { path: '/products', name: 'Produtos' },
  USERS: { path: '/users', name: 'Usuários' }
}

export {
  MAINROUTES
}
