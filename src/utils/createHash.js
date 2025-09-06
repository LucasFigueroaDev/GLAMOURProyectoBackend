import bcrypt from 'bcrypt';

export const createHash = async (password) => {
    const salts = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salts);
}

export const passwordValidation = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};