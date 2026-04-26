const User = require('../models/User');
const Booking = require('../models/Booking');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalWorkers = await User.countDocuments({ role: 'worker' });
    const completedJobs = await Booking.countDocuments({ status: 'completed' });
    
    // We can fetch recent users
    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');

    res.json({
      stats: {
        totalUsers,
        activeProfessionals: totalWorkers,
        completedJobs,
        platformRevenue: '$4,200', // Placeholder or calculate if there is a payment schema
      },
      recentUsers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching dashboard stats' });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
};
