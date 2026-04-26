const Booking = require('../models/Booking');
const User = require('../models/User');

function requireAuth(req, res) {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Not authorized' });
    return false;
  }
  return true;
}

exports.createBooking = async (req, res) => {
  try {
    if (!requireAuth(req, res)) return;
    if (req.user.role !== 'user') {
      return res.status(403).json({ success: false, message: 'Only users can create bookings' });
    }

    const { workerId, profession, address, issueDescription, lat, lng, scheduledStart, scheduledEnd } = req.body;
    
    let targetWorker = null;
    let finalProfession = profession;

    if (workerId) {
      targetWorker = await User.findById(workerId).select('-password');
      if (!targetWorker || targetWorker.role !== 'worker') {
        return res.status(404).json({ success: false, message: 'Worker not found' });
      }
      if (!targetWorker.isAvailable) {
        return res.status(409).json({ success: false, message: 'Worker is not available' });
      }
      finalProfession = profession || targetWorker.profession;
    } else {
      if (!profession) {
        return res.status(400).json({ success: false, message: 'profession is required for open requests' });
      }
    }

    const bookingDoc = {
      user: req.user._id,
      profession: finalProfession,
      address: address || req.user.address,
      issueDescription: issueDescription,
      scheduledStart: scheduledStart ? new Date(scheduledStart) : undefined,
      scheduledEnd: scheduledEnd ? new Date(scheduledEnd) : undefined,
    };
    
    if (targetWorker) {
      bookingDoc.worker = targetWorker._id;
    }

    if (lat !== undefined && lng !== undefined && lat !== '' && lng !== '') {
      const latNum = Number(lat);
      const lngNum = Number(lng);
      if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) {
        return res.status(400).json({ success: false, message: 'Invalid lat/lng' });
      }
      bookingDoc.userLocation = { type: 'Point', coordinates: [lngNum, latNum] };
    }

    const booking = await Booking.create(bookingDoc);

    // Simplest rule: when a booking is created, mark worker unavailable.
    if (targetWorker) {
      await User.findByIdAndUpdate(targetWorker._id, { isAvailable: false });
    }

    const populated = await Booking.findById(booking._id)
      .populate('user', '-password')
      .populate('worker', '-password');

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.listMyBookings = async (req, res) => {
  try {
    if (!requireAuth(req, res)) return;

    let query = {};
    if (req.user.role === 'user') {
      query.user = req.user._id;
    } else if (req.user.role === 'worker') {
      query.$or = [
        { worker: req.user._id },
        { 
          worker: { $exists: false }, 
          status: 'pending', 
          profession: { $regex: new RegExp(`^${req.user.profession}$`, 'i') } 
        }
      ];
    } else {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .populate('user', '-password')
      .populate('worker', '-password');

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    console.error('Error listing bookings:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    if (!requireAuth(req, res)) return;

    const { id } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const isUser = req.user.role === 'user' && String(booking.user) === String(req.user._id);
    const isWorker = req.user.role === 'worker' && String(booking.worker) === String(req.user._id);
    if (!isUser && !isWorker) {
      return res.status(403).json({ success: false, message: 'Not allowed to cancel this booking' });
    }

    if (booking.status !== 'pending' && booking.status !== 'accepted') {
      return res.status(409).json({ success: false, message: `Cannot cancel a ${booking.status} booking` });
    }

    booking.status = 'cancelled';
    booking.cancelledBy = isUser ? 'user' : 'worker';
    booking.cancelReason = reason || undefined;
    booking.cancelledAt = new Date();
    await booking.save();

    // Restore worker availability
    if (booking.worker) {
      await User.findByIdAndUpdate(booking.worker, { isAvailable: true });
    }

    const populated = await Booking.findById(id)
      .populate('user', '-password')
      .populate('worker', '-password');

    res.status(200).json({ success: true, data: populated });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.completeBooking = async (req, res) => {
  try {
    if (!requireAuth(req, res)) return;
    if (req.user.role !== 'worker') {
      return res.status(403).json({ success: false, message: 'Only workers can complete bookings' });
    }

    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    if (String(booking.worker) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not allowed to complete this booking' });
    }

    if (booking.status !== 'accepted') {
      return res.status(409).json({ success: false, message: `Cannot complete a ${booking.status} booking. Must be accepted first.` });
    }

    booking.status = 'completed';
    booking.completedAt = new Date();
    await booking.save();

    // After completion, worker becomes available again
    await User.findByIdAndUpdate(booking.worker, { isAvailable: true });

    const populated = await Booking.findById(id)
      .populate('user', '-password')
      .populate('worker', '-password');

    res.status(200).json({ success: true, data: populated });
  } catch (error) {
    console.error('Error completing booking:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.acceptBooking = async (req, res) => {
  try {
    if (!requireAuth(req, res)) return;
    if (req.user.role !== 'worker') {
      return res.status(403).json({ success: false, message: 'Only workers can accept bookings' });
    }

    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    if (booking.worker && String(booking.worker) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not allowed to accept this booking' });
    }

    if (booking.status !== 'pending') {
      return res.status(409).json({ success: false, message: `Cannot accept a ${booking.status} booking` });
    }

    if (!booking.worker) {
      booking.worker = req.user._id;
    }
    booking.status = 'accepted';
    await booking.save();
    
    await User.findByIdAndUpdate(req.user._id, { isAvailable: false });
    const populated = await Booking.findById(id)
      .populate('user', '-password')
      .populate('worker', '-password');

    res.status(200).json({ success: true, data: populated });
  } catch (error) {
    console.error('Error accepting booking:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

