const Booking = require('../models/Booking');
const Room = require('../models/Room');
const User = require('../models/User');

const createBooking = async (req, res, next) => {
  try {
    const { roomId, date, startTime, endTime, specialNote } = req.body;

    if (!roomId || !date || !startTime || !endTime) {
      res.status(400);
      throw new Error('Please provide room, date, start time, and end time');
    }

    const room = await Room.findById(roomId);
    if (!room) {
      res.status(404);
      throw new Error('Room not found');
    }

    const timeRegex = /^([01]\d|2[0-3]):00$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      res.status(400);
      throw new Error('Times must be in HH:00 format (24-hour)');
    }

    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);

    if (endHour <= startHour) {
      res.status(400);
      throw new Error('End time must be after start time');
    }

    const conflictingBooking = await Booking.findOne({
      roomId,
      date,
      status: 'confirmed',
      $and: [
        { startTime: { $lt: endTime } },
        { endTime: { $gt: startTime } },
      ],
    });

    if (conflictingBooking) {
      res.status(409);
      throw new Error(
        'This time slot is already booked. Please choose a different time.'
      );
    }

    const totalCost = (endHour - startHour) * room.hourlyRate;

    const booking = await Booking.create({
      userId: req.user._id,
      roomId,
      date,
      startTime,
      endTime,
      totalCost,
      specialNote: specialNote || '',
      status: 'confirmed',
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { bookings: booking._id },
    });

    await Room.findByIdAndUpdate(roomId, {
      $inc: { bookingCount: 1 },
    });

    const populatedBooking = await Booking.findById(booking._id).populate({
      path: 'roomId',
      select: 'name image floor hourlyRate',
    });

    res.status(201).json(populatedBooking);
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate({
        path: 'roomId',
        select: 'name image floor hourlyRate capacity',
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to cancel this booking');
    }

    if (booking.status === 'cancelled') {
      res.status(400);
      throw new Error('Booking is already cancelled');
    }

    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      res.status(400);
      throw new Error('Cannot cancel past bookings');
    }

    booking.status = 'cancelled';
    await booking.save();

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { bookings: booking._id },
    });

    await Room.findByIdAndUpdate(booking.roomId, {
      $inc: { bookingCount: -1 },
    });

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    next(error);
  }
};

const getRoomBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      roomId: req.params.roomId,
      status: 'confirmed',
    }).select('date startTime endTime');

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
  getRoomBookings,
};
