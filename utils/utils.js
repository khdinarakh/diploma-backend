import "dotenv/config";

const { ACTIVATION_CODE_LIFETIME } = process.env;

export const generateActivationCode = (min = 100000, max = 999999) => {
	const code = Math.floor(Math.random() * (max - min + 1)) + min;
	return {
		code: '' + code,
		expiresIn: Date.now() + +ACTIVATION_CODE_LIFETIME
	};
};
