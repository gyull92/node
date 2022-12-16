const mongoose = require('mongoose');
const comment = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contents:{
        type: String,
        required: true
    },
    _postid:{
        type: String,
        required:true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Comment", comment);