import mongoose from "mongoose";

/* Create 'User' Schema */
const schemaName = 'user';
const UserSchema = new mongoose.Schema({
    userName: { type: String, default:''},
    userNickname: { type: String, default:''},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    address: {type: String, default:'' },
    contact: {type: String, default:''},
    description: {type: String, default:''},
    userAvatarURL: {type: String, default:''},
    friends: {type: Array, default: []},
    friendRequests: {type: Array, default: []},
    followers: {type: Number, default: 0},
    posts: {type: Array, default: []},

},
{ collection: `${schemaName}`, timestamps: true});


/* Create 'User' model from 'User' Schema */
const User = mongoose.model(`${schemaName}`, UserSchema);

/* Export the module */
export default User; 
