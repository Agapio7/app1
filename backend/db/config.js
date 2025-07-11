const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = async () => {
    try {
        await mongoose.connect(process.env.M_DB);
        console.log('Connected to database');
    } catch (error) {
        console.log('Could not connect to database', error);
    }
};

module.exports = dbConfig;