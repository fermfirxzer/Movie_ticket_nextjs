const seatSchema = new mongoose.Schema({
    seat_id: {
        type: String,
        required: true,
        unique: true
    },
    book: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    theater_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
        required: true
    },
    Date :{
        type:Date,
        required:true,
    },
    Time:{
        type:String,
        required:true,
    },
});
