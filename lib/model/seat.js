import mongoose, { Schema } from 'mongoose';

const seatSchema = new Schema(
  {
    seat_id: {
      type: String,
      required: true,
    },
   
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    theater_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater', // Assuming you have a Theater model
        required: true
    },
    Date:{
        type: Date,
        required: true
    },
    Time:{
        type:String,
        equired: true
    }
  }
);


export const Seat = mongoose.models.Seat || mongoose.model('Seat', seatSchema);
