import handleLogin from "./handleLogin";

const userUrl = "http://localhost:3001/users";
const postHeader = {
  method: "POST", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
  },
};

function postCreateUserAccount(returned, username, password) {
  const date = new Date()
  let timeofCreation = date.getTime()
  return fetch(userUrl, {
    ...postHeader,
    body: JSON.stringify({
      ...returned,
      following: [],
      followers: [],
      timestamp: timeofCreation,
    }),
  }).then(() => handleLogin(username, password));
}

export default postCreateUserAccount;
