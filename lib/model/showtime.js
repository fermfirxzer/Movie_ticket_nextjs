const showtimeSchema = new mongoose.Schema({
    show_id: {
        type: String,
        required: true,
        unique: true
    },
    theater_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
        required: true
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', 
        required: true
    },
    show_time: [{
        type: Date,
        required: true
    }],
});
