import { CustomBodyValidator, createValidatorMiddleware } from "./general.validator.js";

const slug = new CustomBodyValidator("slug").string().length().getValidator();
const name = new CustomBodyValidator("name").string().length().getValidator();
const workEmail = new CustomBodyValidator("workEmail").email().length().getValidator();
const phoneNumber = new CustomBodyValidator("phoneNumber").string().length().getValidator();
const description = new CustomBodyValidator("description").string().length().getValidator();
const price = new CustomBodyValidator("price").number().getValidator();
const size = new CustomBodyValidator("size").number().getValidator();
const capacity = new CustomBodyValidator("capacity").number().getValidator();
const location = new CustomBodyValidator("location").string().length().getValidator();

export const createDormValidator = createValidatorMiddleware([
  slug,
  name,
  workEmail,
  phoneNumber,
  description,
  price,
  size,
  capacity,
  location
]);

export const updateDormValidator = createValidatorMiddleware([
  slug,
  name,
  workEmail,
  phoneNumber,
  description,
  price,
  size,
  capacity,
  location
]);
