import axios from "axios";
import { SPRING_API_URL } from "../../config";
import authHeader from "../auth/AuthHeader";
import User from "../User";

const API_URL = SPRING_API_URL('question');

class QuestionService {
  getAllQuestionByTitle(title) {
    const config = {
      headers: authHeader()
    };

    return axios
      .get(API_URL + "/title/" + title, config)
      .then((response) => {
        return response.data;
      });
  }

  getAllQuestionByTags() {
    const config = {
      headers: authHeader()
    };

    const user = User();

    return axios
      .get(API_URL + "/tags/" + user.id, config)
      .then((response) => {
        console.log(response.data)
        return response.data;
      });
  }

  getSaveQuestion() {
    const config = {
      headers: authHeader()
    };

    const user = User();

    return axios
      .get(API_URL + "/save/" + user.id, config)
      .then((response) => {
        return response;
      });
  }

  saveQuestion(id, title, link, tags) {
    const config = {
      headers: authHeader()
    };

    const user = User();

    return axios
      .post(API_URL + "/save/", {
        'userId': user.id,
        'questionId': id,
        'title': title,
        'link': link,
        'tags': tags
        }, config)
      .then((response) => {
        console.log(response)
      });
  }

  deleteSaveQuestion(id) {
    const config = {
      headers: authHeader()
    };

    return axios
      .delete(API_URL + "/save/" + id, config)
      .then((response) => {
        console.log(response)
      });
  }

}

export default new QuestionService();