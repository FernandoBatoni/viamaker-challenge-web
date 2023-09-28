
import { IVideos } from "../app/Home/homeInterfaces"
import api from "../services/api"
import { Repository } from "./Repository"

class VideoRepository extends Repository<IVideos[], IVideos, IVideos[], IVideos> {

}

export default new VideoRepository({ path: '/videos', api })
