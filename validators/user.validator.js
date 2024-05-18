import { CustomBodyValidator, createValidatorMiddleware } from "./general.validator.js";
import "dotenv/config";

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const firstName = new CustomBodyValidator("firstName").string().length().getValidator();
const lastName = new CustomBodyValidator("lastName").string().length().getValidator();
const email = new CustomBodyValidator("email").email().length().getValidator();
const password = new CustomBodyValidator("password")
  .string()
  .length(8, 30)
  .matches(
    PASSWORD_PATTERN,
    "Пароль должен быть не менее 8 символов и содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ"
  )
  .getValidator();
const universityName = new CustomBodyValidator("universityName").string().length().getValidator();
const year = new CustomBodyValidator("year").number().getValidator();
const dateOfBirth = new CustomBodyValidator("dateOfBirth").string().length().getValidator();
const location = new CustomBodyValidator("location").string().length().getValidator();
const code = new CustomBodyValidator("code").string().length(6, 6).getValidator();

export const registerValidator = createValidatorMiddleware([firstName, lastName, email, password]);
export const loginValidator = createValidatorMiddleware([email, password]);
export const fillDetailsValidator = createValidatorMiddleware([
  universityName,
  year,
  dateOfBirth,
  location
]);
export const updateUserValidator = createValidatorMiddleware([
  firstName,
  lastName,
  email,
  universityName,
  year,
  dateOfBirth,
  location
]);
export const activateUserValidator = createValidatorMiddleware([code]);
