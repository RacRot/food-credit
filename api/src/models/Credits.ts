import mongoose from 'mongoose';

const CreditsSchema = new mongoose.Schema({
    food: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    quantityType: String,
    //terms
    creditor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    debtor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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
    quantityType?: string,
    creditor: string,   //username, not the entire structure
    debtor: string,     //username, not the entire structure
    createdAt: Date,
    closedAt?: Date,
};

const Credits = mongoose.model('Credits', CreditsSchema);

export default Credits;
