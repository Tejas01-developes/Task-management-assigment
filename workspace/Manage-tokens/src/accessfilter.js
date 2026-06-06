import jwt from 'jsonwebtoken';
export const accessfilter = (req, resp, next) => {
    const token = req.headers.authorization;
    const access = token?.split(" ")[1];
    if (!access) {
        return resp.status(400).json({ success: false, message: "access token is not there" });
    }
    try {
        const decode = jwt.verify(access, process.env.ACCESS_KEY);
        req.id = decode.id;
        next();
    }
    catch (err) {
        console.log(err);
        return resp.status(400).json({ success: false, message: "access filter failed" });
    }
};
//# sourceMappingURL=accessfilter.js.map