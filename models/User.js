import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_id: {type:String, unique: true},
    user_pw: {type:String},
    name: {type:String},
    birthday: {type:String},
    belong: {type:String},
    team: {type:String},
    email: {type:String},
    phone: {type:String},
    education: [{type:String}],
    certificate: [{type:String}],
    activites: [{type:String}],
    awards: [{type:String}],
    projects: [{type: mongoose.Schema.Types.ObjectId, ref:"Project"}]
});

const User = mongoose.model("User", userSchema);
export default User;