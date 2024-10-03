import mongoose, { Schema } from 'mongoose';

const ShowtimeSchema = new Schema({
  showtime_id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true // Automatically generate ObjectId
  },
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: 'Movie', // Assuming you have a Movie model
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  times: [
    {
      Theater_id: {
        type: String,
        required: true // Example: "Theater 1", "Theater 2"
      },
      show_times: {
        type: [String], // Array of strings representing times like ["15:30", "16:30", "17:30"]
        required: true
      }
    }
  ]
});


export const Showtime = mongoose.models.Showtime || mongoose.model('Showtime', ShowtimeSchema);