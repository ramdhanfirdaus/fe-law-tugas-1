import axios from "axios";
import { SPRING_API_URL } from "../../config";
import authHeader from "./AuthHeader";
import User from "../User";

const API_URL = SPRING_API_URL('auth/');

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        "username": username,
        "password": password
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, nama, password) {
    return axios.post(API_URL + "signup", {
      "username": username,
      "nama": nama,
      "password": password,
      "role": "PENGGUNA"
    });
  }

  updateProfile(nama) {
    const config = {
      headers: authHeader()
    };

    const user = User();
    user.nama = nama

    return axios.patch(API_URL + "update", {
      "id": user.id,
      "nama": nama,
    }, config).then(() => {
      localStorage.setItem("user", JSON.stringify(user));
    });

  }
}

export default new AuthService();