import mongoose, { Schema } from 'mongoose';

const movieSchema = new Schema(
  {
    movie_id: {
      type: String,
      required: true,
    },
    movie_name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    startdate: {
      type: Date,
      required: true,
    },
    enddate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
