import { param, body, validationResult } from "express-validator";

export const createValidatorMiddleware = (array) => {
  return array.concat([
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    }
  ]);
};

export class CustomBodyValidator {
  constructor(fieldName) {
    this.validator = body(fieldName)
      .exists({ checkFalsy: true })
      .withMessage("This field is required");
    this.fieldName = fieldName;
  }

  number() {
    this.validator = this.validator.isInt().withMessage("This value must be a number");
    return this;
  }

  string() {
    this.validator = this.validator.isString().withMessage("This value must be a string");
    return this;
  }

  length(min = 2, max = 1000) {
    this.validator = this.validator
      .isLength({ min, max })
      .withMessage(`The length of this field must be between ${min} and ${max} characters`);
    return this;
  }

  email() {
    this.validator = this.validator
      .isEmail()
      .withMessage("This is not a valid email address (must include @ symbol)");
    return this;
  }

  objectId() {
    this.validator = this.validator.isMongoId().withMessage("This value must be an ObjectID");
    return this;
  }

  matches(pattern, message) {
    this.validator = this.validator.matches(pattern).withMessage(message);
    return this;
  }

  getValidator() {
    return this.validator;
  }
}

export class CustomParamValidator {
  constructor(fieldName) {
    this.validator = param(fieldName).isMongoId().withMessage("This value must be an ObjectID");
    this.fieldName = fieldName;
  }
  getValidator() {
    return this.validator;
  }
}

const id = new CustomParamValidator("id").getValidator();
export const checkIdParamValidator = createValidatorMiddleware([id]);
