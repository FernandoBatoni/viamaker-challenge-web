import { HomeFilled, ShoppingFilled, ShoppingOutlined, UserOutlined } from "@ant-design/icons"

import Home from "../app/Home/Home"
import Products from "../app/Products/Products"
import Users from "../app/Users/Users"
import { IRouterRoute } from "../interfaces/IRoute"
import { MAINROUTES } from "./routerConstants"

const routes: IRouterRoute[] = [
  {
    path: MAINROUTES.HOME.path,
    name: MAINROUTES.HOME.name,
    element: Home,
    icon: { filled: HomeFilled, outlined: HomeFilled },
    title: 'Página Inicial'
  },
  {
    path: MAINROUTES.PRODUCTS.path,
    name: MAINROUTES.PRODUCTS.name,
    element: Products,
    icon: { filled: ShoppingFilled, outlined: ShoppingOutlined },
    title: 'Produtos'
  },
  {
    path: MAINROUTES.USERS.path,
    name: MAINROUTES.USERS.name,
    element: Users,
    icon: { filled: UserOutlined, outlined: UserOutlined },
    title: 'Usuários'
  },
]

export default routes
