import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Hash plain password
export const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        throw new Error("Password hashing failed");
    }
};

// Compare plain password with hashed password
export const comparePassword = async (plain, hashed) => {
    try {
        return await bcrypt.compare(plain, hashed);
    } catch (error) {
        throw new Error("Password comparison failed");
    }
};
