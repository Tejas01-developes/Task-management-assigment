import mongoose from "mongoose";
declare const task_collection: mongoose.Model<{
    id: string;
    description: string;
    userid: string;
    title: string;
    status: "Pending" | "Completed";
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    id: string;
    description: string;
    userid: string;
    title: string;
    status: "Pending" | "Completed";
}, {}, mongoose.DefaultSchemaOptions> & {
    id: string;
    description: string;
    userid: string;
    title: string;
    status: "Pending" | "Completed";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    id: string;
    description: string;
    userid: string;
    title: string;
    status: "Pending" | "Completed";
}, mongoose.Document<unknown, {}, {
    id: string;
    description: string;
    userid: string;
    title: string;
    status: "Pending" | "Completed";
}, {}, mongoose.DefaultSchemaOptions> & {
    id: string;
    description: string;
    userid: string;
    title: string;
    status: "Pending" | "Completed";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, unknown, {
    id: string;
    description: string;
    userid: string;
    title: string;
    status: "Pending" | "Completed";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    id: string;
    description: string;
    userid: string;
    title: string;
    status: "Pending" | "Completed";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default task_collection;
//# sourceMappingURL=task-schema.d.ts.map