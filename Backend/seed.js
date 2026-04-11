const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/local_worker';

const professions = ['Electrician', 'Plumber', 'Cleaner', 'Carpenter', 'Painter', 'Maid', 'Barber', 'AC Repair', 'Tutor'];
const names = ['John Doe', 'Priya Sharma', 'Rahul Kumar', 'Amit Singh', 'Sneha Gupta', 'Vikram Patel', 'Anjali Desai', 'Suresh Reddy', 'Mohan Das', 'Neha Verma'];
const cities = [
  { name: 'Mumbai', coords: [72.8777, 19.0760] },
  { name: 'Delhi', coords: [77.2090, 28.6139] },
  { name: 'Bangalore', coords: [77.5946, 12.9716] },
  { name: 'Chennai', coords: [80.2707, 13.0827] },
  { name: 'Kolkata', coords: [88.3639, 22.5726] }
];

async function seed() {
  try {
    await mongoose.connect(URI);
    console.log('Connected to DB');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    for (let i = 0; i < 30; i++) {
        const profession = professions[Math.floor(Math.random() * professions.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const isWorker = true;
        
        // slight jitter to coordinates
        const lng = city.coords[0] + (Math.random() - 0.5) * 0.1;
        const lat = city.coords[1] + (Math.random() - 0.5) * 0.1;

        const email = `worker${i}_${Date.now()}@example.com`;

        await User.create({
            name: names[Math.floor(Math.random() * names.length)],
            email,
            password,
            phone: '999999999' + Math.floor(Math.random() * 10),
            address: `${city.name} Region`,
            role: 'worker',
            profession: profession,
            isAvailable: true,
            location: {
                type: 'Point',
                coordinates: [lng, lat]
            }
        });
    }

    console.log('Seeded 30 realistic workers across major cities!');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

seed();
