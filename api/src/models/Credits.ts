import mongoose from 'mongoose';

const CreditsSchema = new mongoose.Schema({
    food: String,
    quantity: Number,
    quantityType: String,
    //terms
    creditor: mongoose.Schema.Types.ObjectId,
    debtor: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
    closedAt: Date,
    //tags: []
    //...data
});

const Credits = mongoose.model('Credits', CreditsSchema);

export default Credits;
