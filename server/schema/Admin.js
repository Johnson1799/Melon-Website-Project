import mongoose from "mongoose";

/* Create 'Post' Schema */
const schemaName = 'admin';

const AdminSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    users: {type: Array, default: null},
    posts: {type: Array, default: null},

},
{ collection: `${schemaName}`, timestamps: true});


/* Create 'User' model from 'User' Schema */
const Admin = mongoose.model(`${schemaName}`, AdminSchema);

/* Export the module */
export default Admin; 

