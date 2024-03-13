import mongoose from "mongoose";

/* Create 'Post' Schema */
const PostSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    userName: { type: String, required: true},
    description: {type: String},
    userAvatarURL: {type: String},
    postImgURL: {type: String},
    likes: {type: Map, of: Boolean},        // a Map object with boolean value
    comments: {type: Array, default: []}

}, {timestamps: true });


/* Create 'User' model from 'User' Schema */
const Post = mongoose.model('Post', PostSchema);

/* Export the module */
export default Post; 