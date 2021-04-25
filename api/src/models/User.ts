import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 4,
        maxLength: 20,
        trim: true
    },
    //...configs
    //  tags: []
    //  notify
    //...data
    //  brokies: []
    //  status
});

export type IUser = {
    passwordHash?: string;
    email?: string;
    username?: string;
};

const User = mongoose.model('User', UserSchema);

export default User;
