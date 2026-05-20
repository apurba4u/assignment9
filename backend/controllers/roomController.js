const Room = require('../models/Room');
const Booking = require('../models/Booking');
const User = require('../models/User');

const getRooms = async (req, res, next) => {
  try {
    const { search, amenities, minRate, maxRate, floor } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (amenities) {
      const amenitiesArray = Array.isArray(amenities)
        ? amenities
        : amenities.split(',');
      filter.amenities = { $in: amenitiesArray };
    }

    if (minRate || maxRate) {
      filter.hourlyRate = {};
      if (minRate) filter.hourlyRate.$gte = Number(minRate);
      if (maxRate) filter.hourlyRate.$lte = Number(maxRate);
    }

    if (floor) {
      filter.floor = Number(floor);
    }

    const rooms = await Room.find(filter)
      .sort({ createdAt: -1 })
      .populate('owner', 'name email photoURL');

    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

const getLatestRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('owner', 'name email photoURL');

    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate(
      'owner',
      'name email photoURL'
    );

    if (!room) {
      res.status(404);
      throw new Error('Room not found');
    }

    res.json(room);
  } catch (error) {
    next(error);
  }
};

const createRoom = async (req, res, next) => {
  try {
    const { name, description, image, floor, capacity, hourlyRate, amenities } =
      req.body;

    if (!name || !description || !image || floor === undefined || !capacity || !hourlyRate) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }

    const room = await Room.create({
      name,
      description,
      image,
      floor,
      capacity,
      hourlyRate,
      amenities: amenities || [],
      owner: req.user._id,
    });

    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      res.status(404);
      throw new Error('Room not found');
    }

    if (room.owner.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this room');
    }

    const allowedFields = ['name', 'description', 'image', 'floor', 'capacity', 'hourlyRate', 'amenities'];
    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      res.status(404);
      throw new Error('Room not found');
    }

    if (room.owner.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this room');
    }

    await Booking.deleteMany({ roomId: room._id });
    await Room.findByIdAndDelete(req.params.id);

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getMyListings = async (req, res, next) => {
  try {
    const rooms = await Room.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRooms,
  getLatestRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getMyListings,
};
