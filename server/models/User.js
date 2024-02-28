import mongoose from "mongoose";

/* Create 'User' Schema */
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true, min: 8},
    email: {type: String, required: true, unique: true},
    userIconPath: {type: String, default: ""},
    friends: {type: Array, default: []},
    followers: {type: Number, default: 0}, 

}, {timestamps: true });


/* Create 'User' model from 'User' Schema */
const User = mongoose.model('User', UserSchema);

/* Export the module */
export default User; 
