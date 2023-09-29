
import { IUser } from "../app/Users/userInterfaces"
import api from "../services/api"
import { Repository } from "./Repository"

class UserRepository extends Repository<IUser[], IUser, IUser[], IUser> {}

export default new UserRepository({ path: '/users', api })