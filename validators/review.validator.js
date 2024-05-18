import { CustomBodyValidator, createValidatorMiddleware, id } from "./general.validator.js";

const comment = new CustomBodyValidator("comment").string().length().getValidator();
const room = new CustomBodyValidator("rate.room").number().getValidator();
const location = new CustomBodyValidator("rate.location").number().getValidator();
const building = new CustomBodyValidator("rate.building").number().getValidator();
const bathroom = new CustomBodyValidator("rate.bathroom").number().getValidator();

export const createReviewValidator = createValidatorMiddleware([
  comment,
  room,
  location,
  building,
  bathroom
]);

export const updateReviewValidator = createValidatorMiddleware([
  id,
  comment,
  room,
  location,
  building,
  bathroom
]);