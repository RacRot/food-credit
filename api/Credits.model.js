const mongoose = require('mongoose');

const CreditsSchema = new mongoose.Schema({
    food: String,
    quantity: Number,
    quantityType: String,
    //terms
    creditor: UserSchema,
    debtor: UserSchema,
    createdAt: Date,
    closedAt: Date,
    //tags: []
    //...data
});
const Credits = mongoose.model('Credits', CreditsSchema);

module.exports = Credits;