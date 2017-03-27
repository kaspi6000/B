import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Messages = new Schema({
    userid: String,
    name: String,
    message: String
});

export default mongoose.model('messages', Messages);
