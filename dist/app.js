import express from 'express';
import dotenv from 'dotenv';
import dbconnection from '@workspace/database-connection';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';
import core from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(core({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use("/apis", router);
app.listen(process.env.PORT, async () => {
    await dbconnection.connect();
    console.log(`server started on the port ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map