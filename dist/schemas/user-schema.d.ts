import mongoose from "mongoose";
declare const user_collection: mongoose.Model<{
    id: string;
    name: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    id: string;
    name: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    id: string;
    name: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    id: string;
    name: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    id: string;
    name: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps, {}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & {
    id: string;
    name: string;
    email: string;
    password: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, unknown, {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default user_collection;
//# sourceMappingURL=user-schema.d.ts.map