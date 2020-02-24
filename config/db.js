const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:17017/chat',{useNewUrlParser:true,useUnifiedTopology:true});

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    mail:String,
    password:String
});

const User = mongoose.model('User',userSchema);
module.exports = User;