import 'dotenv/config';
import mongoose from 'mongoose';
import app from './src/app.js';

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

//connect to mongodb
const connectDb = async() => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected successfully ✅');
  } catch (error) {
    console.error('MongoDB connection failed :', error.message);
  process.exit(1);
  };
};

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT} 🚀`);
});

connectDb();