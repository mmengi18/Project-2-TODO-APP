// require dotenv to load .env file and get enviromental variable DATABASE_URI 
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');

// Fire off the connection to Mongo DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`);
});

mongoose.connection.on("error", (err) => {
  console.log("Could not connect to MongoDB!", err);
});


module.exports = mongoose



