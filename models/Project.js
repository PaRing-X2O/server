import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {type:String},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref:"Post"}],
    author: {type: mongoose.Schema.Types.ObjectId, ref:"User"}
});

const Project = mongoose.model("Project",projectSchema);
export default Project;