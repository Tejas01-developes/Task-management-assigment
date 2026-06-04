import jwt from 'jsonwebtoken';
import { accesstoken } from "./generate-token.js";
export const refreshfilter = (req, resp) => {
    const token = req.cookies.refresh;
    if (!token) {
        return resp.status(400).json({ success: false, message: "refresh token is not there" });
    }
    try {
        const decode = jwt.verify(token, process.env.REFRESH_KEY);
        const id = decode.id;
        if (!id) {
            return resp.status(400).json({ success: false, message: "userid is not decoded" });
        }
        accesstoken(id);
    }
    catch (err) {
        return resp.status(400).json({ success: false, message: "refresh filter failed" });
    }
};
//# sourceMappingURL=refreshfilter.js.map