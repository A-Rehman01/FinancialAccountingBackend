import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import Company from './modals/generalEntryModal.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {};

const destroyData = async () => {
  try {
    await Company.deleteMany();
    console.log('Data destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.green.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
