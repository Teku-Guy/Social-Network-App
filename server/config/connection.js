import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.set('strictQuery', false); // or false, depending on your preference
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/media-base',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  }
);

export default mongoose.connection;