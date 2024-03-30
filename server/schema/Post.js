import mongoose from "mongoose";

/* Create 'Post' Schema */
const schemaName = 'post';

const replySchema = new mongoose.Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    userAvatarURL: {type: String, required: true},
    reply: {type: String, required: true},
});

const commentSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    userAvatarURL: {type: String, required: true},
    comment: {type: String, required: true},
    replies: [replySchema],
});

const PostSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    userName: { type: String },
    title: {type: String},
    description: {type: String},
    userAvatarURL: {type: String},
    postImgURL: {type: String},
    likes: [{type: String, default: []}],        // a Map object with boolean value
    comments: [commentSchema],
    isPrivate: {type: Boolean, default:false},

},
{ collection: `${schemaName}`, timestamps: true});


/* Create 'User' model from 'User' Schema */
const Post = mongoose.model(`${schemaName}`, PostSchema);

/* Export the module */
export default Post; 