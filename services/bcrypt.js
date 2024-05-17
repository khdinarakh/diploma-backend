import { genSalt, hash, compare } from "bcrypt";

export const hashPassword = async (passwd, saltRounds = 10) => {
  try {
    const salt = await genSalt(saltRounds);
    return await hash(passwd, salt);
  } catch (error) {
    console.error(error);
  }
};

export const isValidPassword = async (passwordFromRequest, hashedPassword) => {
  try {
    return await compare(passwordFromRequest, hashedPassword);
  } catch (error) {
    console.error(error);
  }
};
