import mongoose from "mongoose";

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    SUPER_ADMIN = 'super_admin'
}

export enum UserStatus {
    VERIFIED = 'verified',
    UNVERIFIED = 'unverified',
    DISABLED = 'disabled'
}

export interface I_UserDocument extends mongoose.Document {
    google_id: string;
    displayName: string;
    email: string;
    provider: string;
    sessionToken: string;
    role?: Role;
    status?: UserStatus;
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
    google_id: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true},
    provider: { type: String, required: true },
    sessionToken: { type: String, select: false },
    role: { type: String, enum: Role, default: 'user' },
    status: { type: String, enum: UserStatus, default: 'unverified' },
});

export const UserModel = mongoose.model<I_UserDocument>('User', UserSchema);

export const getUsers = () => UserModel.find();

export const getUserById = (id: string) => UserModel.findById(id);

export const getUserByGoogleId = (google_id: string) => UserModel.findOne({ google_id });

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({ _id: id});

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate({ _id: id}, values);





