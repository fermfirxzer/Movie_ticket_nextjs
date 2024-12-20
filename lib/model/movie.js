import mongoose, { Schema } from 'mongoose';

const movieSchema = new Schema(
  {
    movie_name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    Tag: {
      type: [String], // Array of strings
      required: true, // Optional: Ensure this field is required
    }, Age: {
      type: String,
      require: true,
    }, Sub: {
      type: [String],
    }
  },
  {
    timestamps: true,
  }
);


export const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
