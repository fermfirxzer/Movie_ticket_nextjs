import mongoose, { Schema } from 'mongoose';

const movieSchema = new Schema(
  {
    movie_name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
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
    imageUrl:{
      type:String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);


export const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
