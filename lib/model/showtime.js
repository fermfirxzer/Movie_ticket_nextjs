import mongoose, { mongo, Schema } from 'mongoose'
const showtimeSchema = new mongoose.Schema({
    theater_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater', // Assuming you have a Theater model
        required: true
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', // Assuming you have a Movie model
        required: true
    },
    show_time: [
        {
            type: String,
            required: true
        }
    ],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
    
}, {
    timestamps: true 
});

export const Showtime = mongoose.models.Showtime || mongoose.model('Showtime', showtimeSchema);