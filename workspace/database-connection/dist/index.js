import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
class dbconnect {
    dburl;
    constructor() {
        this.dburl = process.env.DB_URL;
    }
    async connect() {
        try {
            await mongoose.connect(this.dburl);
            console.log("Database connected");
        }
        catch (err) {
            throw new Error("Database connection failed");
        }
    }
}
export default new dbconnect();
//# sourceMappingURL=index.js.map