import User from "../User";

export default function authHeader() {
  const user = User();

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}