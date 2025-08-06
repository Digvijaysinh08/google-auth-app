import { Schema, model } from 'mongoose';
import { IUserDoc, IUserModel } from '@schemas';

const UserSchema = new Schema<IUserDoc>(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            trim: true,
            // required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        // id: false,
        timestamps: true,
        // toJSON: {
        //     getters: true,
        // },
        // toObject: {
        //     getters: true,
        // },
    }
);

export const User = model<IUserDoc, IUserModel>('User', UserSchema, 'users');
