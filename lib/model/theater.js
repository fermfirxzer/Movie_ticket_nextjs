const theaterSchema = new mongoose.Schema({
    theater_id: {
        type: String,
        required: true,
        unique: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    theater_name: {
        type: String,
        required: true
    }
});
