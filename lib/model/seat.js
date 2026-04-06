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
      ref: 'Theater',
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    Time: {
      type: String,
      required: true,
    },
    history_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'History',
      required: false,
    },
    expires_at: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ['not paying', 'success'],
      default: 'not paying',
    },
  }
);

export const Seat = mongoose.models.Seat || mongoose.model('Seat', seatSchema);
