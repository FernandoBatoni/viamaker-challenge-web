
import { AxiosRequestConfig } from "axios"

import { IUser } from "../app/Users/userInterfaces"
import api from "../services/api"
import { Repository } from "./Repository"

class UserRepository extends Repository<IUser[], IUser, IUser[], IUser> {
  async delete(id: string, config?: AxiosRequestConfig) {
    return this.handle(() =>
      this.api.delete(`${this.path}/${id}`, config)
    )
  }
}

export default new UserRepository({ path: '/usuarios', api })