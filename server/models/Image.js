import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ImageSchema = new Schema({
  img_type: String,
  location: String,
  owner: String,
  createdAt: String,
});

const Image = model('Image', ImageSchema);

export default Image;