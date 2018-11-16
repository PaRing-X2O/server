import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    date: {type:Date},
    title: {type:String},
    sponsors: [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    desc: {type:String},
    images: [{type:String}],
    thumbnail: {type:String}
});

const Post = mongoose.model("Post",postSchema);
export default Post;