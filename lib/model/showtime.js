import mongoose, { mongo, Schema } from 'mongoose'
const showtimeSchema = new mongoose.Schema({
    theater_id: {
        type: Schema.Types.ObjectId,
        ref: 'Theater', 
        required: true
    },
    movie_id: {
        type: Schema.Types.ObjectId,
        ref: 'Movie', 
        required: true
    },
    show_time: [
        {
            type: String,
            required: true
        }
    ],
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },Sub:{
        type:String,
        required:true,
    }
    
}, {
    timestamps: true 
});

export const Showtime = mongoose.models.Showtime || mongoose.model('Showtime', showtimeSchema);