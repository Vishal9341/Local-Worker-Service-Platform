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
