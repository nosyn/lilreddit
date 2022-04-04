import crypto from "crypto";

const SIZE = 16;
const ITERATIONS = 1000;
const KEY_LENGTH = 64;

// Creating a unique salt for a particular user
export const generateSalt = (): string =>
  crypto.randomBytes(SIZE).toString("hex");

// Hashing user's salt and password with 1000 iterations,
export const hashPassword = (password: string, salt: string): string => {
  return crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, `sha512`)
    .toString(`hex`);
};
