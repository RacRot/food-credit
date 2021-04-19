import mongoose from 'mongoose';
import { IUser } from './User';

const CreditsSchema = new mongoose.Schema({
    food: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    quantityType: String,
    //terms
    creditor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    debtor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    closedAt: Date,
    //tags: []
    //...data
});

export type ICredit = {
    food: string,
    quantity: number,
    creditor: string,   //username, not the entire structure
    debtor: string,     //username, not the entire structure
    createdAt: Date,
    closedAt?: Date,
};

const Credits = mongoose.model('Credits', CreditsSchema);

export default Credits;
