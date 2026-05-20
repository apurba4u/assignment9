const express = require('express');
const router = express.Router();
const {
  getRooms,
  getLatestRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getMyListings,
} = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');

router.get('/latest', getLatestRooms);
router.get('/my-listings', protect, getMyListings);
router.get('/', getRooms);
router.get('/:id', getRoomById);
router.post('/', protect, createRoom);
router.put('/:id', protect, updateRoom);
router.delete('/:id', protect, deleteRoom);

module.exports = router;
