const express = require("express");
const axios = require("axios");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { APIURI: URI } = require("../utils/config");
const { checkCache, saveToCache } = require("../cache/cacheHelper");

router.get("/ping", (req, res) => {
  res.send({
    result: "pong",
  });
});

//aggregate user todo data from external APIs
router.get(
  "/user-todo/:id",
  //TODO: Add validation for id
  checkCache,
  catchAsync(async (req, res, next) => {
    if (req.cached) return res.send(req.cached);
    const { id } = req.params;
    //data -> data: user -> data: { name, username }
    const { data: { name, username } = {} } = await axios.get(`${URI}/${id}/`);
    //data -> data: [todo, ...rest] -> data: [{title, completed}, ...rest]
    const { data: [{ title, completed } = {}, ...restOfPossibleTodos] = [] } =
      await axios.get(`${URI}/${id}/todos?id=1`);
    //data -> data: [comment, ...rest] -> data: [{body}, ...rest]
    const { data: [{ body } = {}, ...restOfPossibleComments] = [] } =
      await axios.get(`${URI}/${id}/comments?id=1`);
    const apiData = {
      name,
      username,
      title,
      completed,
      description: body,
    };
    //TODO: Add validation for apiData
    await saveToCache({ id, ...apiData });
    //respond without id
    return res.send(apiData);
  })
);

module.exports = router;
