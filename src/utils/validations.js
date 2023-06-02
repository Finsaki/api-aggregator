const ExpressError = require("./ExpressError");
const Joi = require("joi");

const apiDataSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  title: Joi.string().required(),
  completed: Joi.boolean().required(),
  description: Joi.string().required(),
});

//Basic Integer validation without Joi to avoid bad requests to be sent
const validateId = (req, res, next) => {
  const { id } = req.params;
  const valid = Number.isInteger(Number(id)) && id > 0 && id < 10000;
  if (!valid) {
    throw new ExpressError("Invalid Id", 400);
  } else {
    next();
  }
};

//Validating API response with Joi before caching to DB
const validateApiData = (apiData) => {
  const { error } = apiDataSchema.validate(apiData);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    //for now we assume each field is expected and respond with 502 if any data is missing
    throw new ExpressError(msg, 502);
  }
};

module.exports = { validateId, validateApiData };
