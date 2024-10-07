import mongoose, { Schema } from 'mongoose';
const historySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    purchase_time: {
        type: Date,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
        min: 0,
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', // Reference to the Movie model
        required: true,
    }
}, {
    timestamps: true, 
});

// Create a model from the schema
export const History = mongoose.models.History || mongoose.model('History', historySchema);