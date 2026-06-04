import jwt from 'jsonwebtoken';
export const accesstoken = (id) => {
    return jwt.sign({ id: id }, process.env.ACCESS_KEY, { expiresIn: "15m" });
};
export const refreshtoken = (id) => {
    return jwt.sign({ id: id }, process.env.REFRESH_KEY, { expiresIn: "7d" });
};
//# sourceMappingURL=generate-token.js.map