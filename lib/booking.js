import mongoose from 'mongoose';
import QRCode from 'qrcode';
import { connectMongoDB } from './mongodb.js';
import { History } from './model/history';
import { Movie } from './model/movie';
import { Seat } from './model/seat';
import { Theater } from './model/theater';
import { User } from './model/user';

export async function createSeatBooking(payload) {
  await connectMongoDB();

  const { seatIds, moviename, date, showid, theater, time, username, total_amount } = payload;
  const parsedSeatIds = typeof seatIds === 'string' ? JSON.parse(seatIds) : seatIds;

  if (!Array.isArray(parsedSeatIds) || parsedSeatIds.length === 0) {
    throw new Error('No paid seats were provided.');
  }

  const seatObjectIds = parsedSeatIds.map((id) => new mongoose.Types.ObjectId(id));
  const existingSuccessSeat = await Seat.findOne({
    _id: { $in: seatObjectIds },
    status: 'success',
    history_id: { $exists: true, $ne: null },
  }).select('history_id');

  if (existingSuccessSeat) {
    return { message: 'Booking already processed', history_id: existingSuccessSeat.history_id };
  }

  const [user, movie, theaterDoc] = await Promise.all([
    User.findOne({ username }).select('_id point'),
    Movie.findOne({ movie_name: decodeURI(moviename) }).select('_id'),
    Theater.findOne({ theater_name: theater }).select('_id'),
  ]);

  if (!user) throw new Error(`User not found: ${username}`);
  if (!movie) throw new Error(`Movie not found: ${decodeURI(moviename)}`);
  if (!theaterDoc) throw new Error(`Theater not found: ${theater}`);

  const history = new History({
    user_id: user._id,
    purchase_time: new Date(),
    total_amount: Number(total_amount),
    movie_id: movie._id,
    showtime_id: new mongoose.Types.ObjectId(showid),
  });

  const savedHistory = await history.save();
  const historyId = savedHistory._id;

  await Seat.updateMany(
    { _id: { $in: seatObjectIds }, status: 'not paying' },
    { status: 'success', history_id: historyId },
  );

  const updatedSeats = await Seat.find({ _id: { $in: seatObjectIds } }).select('seat_id price');
  const qrData = {
    history_id: historyId,
    movie: decodeURI(moviename),
    theater_name: theater,
    show_date: date,
    show_time: time,
    seats: updatedSeats.map((seat) => ({
      seat_id: seat.seat_id,
      price: seat.price,
    })),
  };

  savedHistory.qrcode = await QRCode.toDataURL(JSON.stringify(qrData));
  await savedHistory.save();

  user.point = (user.point || 0) + parsedSeatIds.length;
  await user.save();

  return { message: 'Booking successful', history_id: historyId };
}
