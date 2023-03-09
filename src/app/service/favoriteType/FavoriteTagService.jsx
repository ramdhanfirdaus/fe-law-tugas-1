import axios from "axios";
import { SPRING_API_URL } from "../../config";
import authHeader from "../auth/AuthHeader";
import User from "../User";

const API_URL = SPRING_API_URL('fav');

class FavoriteTagService {
  getFavoriteTag() {
    const config = {
      headers: authHeader()
    };

    const user = User();

    return axios
      .get(API_URL + "/" + user.id, config)
      .then((response) => {
        return response
      });
  }

  postFavoriteTag(data) {
    const config = {
      headers: authHeader()
    };

    const user = User();

    return axios
      .post(API_URL + "/",{
        'id': user.id,
        'data': data
      }, config)
      .then((response) => {
        console.log(response.data)
      });
  }

  updateFavoriteTag(data) {
    const config = {
      headers: authHeader()
    };

    const user = User();

    return axios
      .patch(API_URL + "/",{
        'id': user.id,
        'data': data
      }, config)
      .then((response) => {
        console.log(response.data)
      });
  }

}

export default new FavoriteTagService();