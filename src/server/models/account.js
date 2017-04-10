import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
const type = "local facebook google".split(' ');

const Account = new Schema({
    userid: String,
    password: String,
    created: { type: Date, default: Date.now },
    o_auth: {
       google: {
           id: String,
           access_token: String
       }
   }
});

// google ID find method
Account.statics.findUserByGoogleId = function(id) {
    return this.findOne({ 'o_auth.google.id' : id });
}

// generates hash
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
Account.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('account', Account);
