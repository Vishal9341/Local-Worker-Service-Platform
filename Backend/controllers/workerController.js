const User = require('../models/User');

exports.getWorkers = async (req, res) => {
  try {
    const { profession, location } = req.query;
    
    let query = { role: 'worker' };
    
    if (profession && profession.trim() !== '') {
      query.profession = { $regex: new RegExp(profession, 'i') };
    }
    
    if (location && location.trim() !== '') {
        query.address = { $regex: new RegExp(location, 'i') }; 
    }
    

    const workers = await User.find(query).select('-password');
    
    res.status(200).json({ success: true, count: workers.length, data: workers });
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Match workers by profession + availability + nearest location (if lat/lng provided)
exports.matchWorkers = async (req, res) => {
  try {
    const {
      profession,
      lat,
      lng,
      radiusKm = 10,
      start, // ISO datetime string (optional)
      end,   // ISO datetime string (optional)
    } = req.query;

    const now = new Date();
    const desiredStart = start ? new Date(start) : null;
    const desiredEnd = end ? new Date(end) : null;

    const baseMatch = {
      role: 'worker',
      isAvailable: true,
    };

    if (profession && profession.trim() !== '') {
      baseMatch.profession = { $regex: new RegExp(profession, 'i') };
    }

    // If user asks for a time window, only show workers whose window overlaps it (or has no window set)
    if (desiredStart || desiredEnd) {
      const s = desiredStart || now;
      const e = desiredEnd || desiredStart || now;
      baseMatch.$and = [
        {
          $or: [
            { availableFrom: { $exists: false } },
            { availableFrom: null },
            { availableFrom: { $lte: e } },
          ],
        },
        {
          $or: [
            { availableTo: { $exists: false } },
            { availableTo: null },
            { availableTo: { $gte: s } },
          ],
        },
      ];
    }

    const hasCoords = lat !== undefined && lng !== undefined && lat !== '' && lng !== '';
    if (!hasCoords) {
      const workers = await User.find(baseMatch).select('-password');
      return res.status(200).json({ success: true, count: workers.length, data: workers });
    }

    const latNum = Number(lat);
    const lngNum = Number(lng);
    const radiusMeters = Number(radiusKm) * 1000;

    if (!Number.isFinite(latNum) || !Number.isFinite(lngNum) || !Number.isFinite(radiusMeters)) {
      return res.status(400).json({ success: false, message: 'Invalid lat/lng/radiusKm' });
    }

    const pipeline = [
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lngNum, latNum] },
          key: 'location',
          distanceField: 'distanceMeters',
          spherical: true,
          maxDistance: radiusMeters,
          query: baseMatch,
        },
      },
      { $project: { password: 0 } },
      { $sort: { distanceMeters: 1, createdAt: -1 } },
      { $limit: 50 },
    ];

    const matched = await User.aggregate(pipeline);
    res.status(200).json({ success: true, count: matched.length, data: matched });
  } catch (error) {
    console.error('Error matching workers:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Worker updates their own availability + location
exports.updateMyAvailability = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'worker') {
      return res.status(403).json({ success: false, message: 'Only workers can update availability' });
    }

    const { isAvailable, availableFrom, availableTo, lat, lng, address } = req.body;
    const update = {};

    if (typeof isAvailable === 'boolean') update.isAvailable = isAvailable;
    if (availableFrom !== undefined) update.availableFrom = availableFrom ? new Date(availableFrom) : null;
    if (availableTo !== undefined) update.availableTo = availableTo ? new Date(availableTo) : null;
    if (address !== undefined) update.address = address;

    const latNum = lat !== undefined ? Number(lat) : null;
    const lngNum = lng !== undefined ? Number(lng) : null;
    if (lat !== undefined || lng !== undefined) {
      if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) {
        return res.status(400).json({ success: false, message: 'Invalid lat/lng' });
      }
      update.location = { type: 'Point', coordinates: [lngNum, latNum] };
    }

    const updated = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select('-password');
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
