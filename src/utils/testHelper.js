const axios = require("axios");
const ExpressError = require("./ExpressError");
const { APIURI: URI } = require("./config");

const axiosMockData = () => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case `${URI}/1/`:
        return Promise.resolve({
          data: userResponse,
        });
      case `${URI}/1/todos?id=1`:
        return Promise.resolve({
          data: todoResponse,
        });
      case `${URI}/1/comments?id=1`:
        return Promise.resolve({
          data: commentResponse,
        });
      default:
        return Promise.reject(new ExpressError("404 Data Not Found", 404));
    }
  });
};

const expectedResponse = {
  name: "Leanne Graham",
  username: "Bret",
  title: "delectus aut autem",
  completed: false,
  description:
    "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
};

const userResponse = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

const todoResponse = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
];

const commentResponse = [
  {
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
];

module.exports = {
  expectedResponse,
  axiosMockData,
};
